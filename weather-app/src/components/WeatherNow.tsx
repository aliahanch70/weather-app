import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useWeather } from '../contexts/WeatherContext';


const simplifyWeatherCondition = (text: string): string => {
    if (!text) return 'Unknown'; 
    const lowerCaseText = text.toLowerCase();

    if (lowerCaseText.includes('sun') || lowerCaseText.includes('clear')) {
        return 'Sunny';
    }
    if (lowerCaseText.includes('cloud') || lowerCaseText.includes('overcast')) {
        return 'Cloudy';
    }
    if (lowerCaseText.includes('rain') || lowerCaseText.includes('drizzle')) {
        return 'Rain';
    }
    if (lowerCaseText.includes('snow') || lowerCaseText.includes('sleet') || lowerCaseText.includes('ice') || lowerCaseText.includes('blizzard')) {
        return 'Snow';
    }
    if (lowerCaseText.includes('thunder')) {
        return 'Storm';
    }
    if (lowerCaseText.includes('mist') || lowerCaseText.includes('fog') || lowerCaseText.includes('haze')) {
        return 'Fog';
    }

    // If no keyword matches, return the first word of the original text as a fallback
    return text.split(' ')[0];
};

export default function WeatherNow() {
    const { weatherData, loading, error, searchQuery } = useWeather();
    const simplifiedText = simplifyWeatherCondition(weatherData?.current.condition.text);


    //  Loading State 
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={4} minHeight={234} maxHeight={234}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading data for {searchQuery}...</Typography>
            </Box>
        );
    }

    // Error State 
    if (error) {
        return (
            <Box p={4} minHeight={234} maxHeight={234}>
                <Typography color="error" align="center">{error}</Typography>
            </Box>
        );
    }

    //  No Data State 
    if (!weatherData) {
        return (
            <Box p={4} minHeight={234} maxHeight={234}>
                <Typography align="center">Search for a location to see the weather.</Typography>
            </Box>
        );
    }

    const localTime = new Date(weatherData.location.localtime);
    const dayOfWeek = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(localTime);
    const fullDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(localTime);

    return (
        <Stack direction="row" spacing={2} sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center' }} maxHeight={234} >
            <Box sx={{ color: "#202224ff", textAlign: 'left' }}>

                <Box sx={{ display: "flex", alignItems: 'center', fontSize: 16, mb: 1, p: 1, gap: 0.5, bgcolor: "#CDD9E0", borderRadius: 5, width: "fit-content" ,px:2 }} >
                    <LocationOnIcon sx={{ fontSize: 20 }} />
                    <Typography  sx={{}}>{weatherData.location.name}</Typography>
                </Box>

                <Box sx={{ fontSize: 32, fontWeight: 'bold',color: "#003464" }}>{dayOfWeek}</Box>
                <Box sx={{ fontSize: 14, mb: 1 ,color: "#003464"}}>{fullDate}</Box>

                <Box sx={{ fontSize: 40, fontWeight: 'bold',color: "#003464" }}>{Math.round(weatherData.current.temp_c)}° C</Box>
                <Box sx={{ fontSize: 14, color: "#003464", textAlign: 'left' }}>High: {weatherData.current.heatindex_c} C</Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'flex-end' }}>


                <Box component="img" sx={{ height: 100, mb: 1 }} alt={weatherData.current.condition.text} src={`https:${weatherData.current.condition.icon}`} />
                <Box sx={{ fontSize: 32, color: "#003464", textAlign: 'right', wordWrap: 'break-word', overflow: 'hidden' }}>{simplifiedText}</Box>
                <Box sx={{ fontSize: 14, color: "#003464", textAlign: 'right', mt: 2 }}>
                    Feels like: {Math.round(weatherData.current.feelslike_c)}° C
                </Box>
            </Box>
        </Stack>
    );
}