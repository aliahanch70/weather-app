import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useWeather } from '../../contexts/WeatherContext';
import NetworkCheckOutlinedIcon from '@mui/icons-material/NetworkCheckOutlined';
import { useTranslation } from 'react-i18next';


// simplify weather condition text


export default function WeatherNow() {
    const { weatherData, loading, error, searchQuery } = useWeather();

    const { t, i18n } = useTranslation();

    // simplify weather condition text
    const simplifyWeatherCondition = (text: string): string => {
        if (!text) return 'Unknown';
        const lowerCaseText = text.toLowerCase();

        if (lowerCaseText.includes('sun') || lowerCaseText.includes('clear')) {
            return `${t('sun')}`;
        }
        if (lowerCaseText.includes('cloud') || lowerCaseText.includes('overcast')) {
            return `${t('cloudy')}`;
        }
        if (lowerCaseText.includes('rain') || lowerCaseText.includes('drizzle')) {
            return `${t('rain')}`;
        }
        if (lowerCaseText.includes('snow') || lowerCaseText.includes('sleet') || lowerCaseText.includes('ice') || lowerCaseText.includes('blizzard')) {
            return `${t('s')}`;
        }
        if (lowerCaseText.includes('thunder')) {
            return `${t('thunder')}`;
        }
        if (lowerCaseText.includes('mist') || lowerCaseText.includes('fog') || lowerCaseText.includes('haze')) {
            return `${t('mist')}`;
        }
        // return the first word 
        return text.split(' ')[0];
    };
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
            <Box m={10} minHeight={234} maxHeight={234} >
                <Typography color="error" align="center"><NetworkCheckOutlinedIcon fontSize='large' />{t('error')}</Typography>
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
    const isFarsi = i18n.language === 'fa';

    const dayOfWeekFormatter = new Intl.DateTimeFormat(
        isFarsi ? 'fa-IR' : 'en-GB', // locale
        {
            weekday: 'long',
            calendar: isFarsi ? 'persian' : 'gregory' // calendar type
        }
    );

    const fullDateFormatter = new Intl.DateTimeFormat(
        isFarsi ? 'fa-IR' : 'en-GB',
        {
            day: 'numeric',
            month: isFarsi ? 'long' : 'short', // month format 
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: !isFarsi, // 12-hour format for english
            calendar: isFarsi ? 'persian' : 'gregory'
        }
    );

    const dayOfWeek = dayOfWeekFormatter.format(localTime);
    const fullDate = fullDateFormatter.format(localTime);

    return (

        <Stack direction="row"
            spacing={2}
            sx={{
                px: { md: 3, xs: 2 },
                py: { md: 2, xs: 1 },
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            maxHeight={234}
        >

            {/* right box */}
            <Box
                sx={{ textAlign: 'left' }}>

                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        mb: 1,
                        gap: 0.5,
                        bgcolor: '#CDD9E0',
                        borderRadius: 5,
                        px: 2,
                        py: 1,
                    }}
                >
                    <LocationOnIcon
                        sx={{
                            fontSize: { md: 16, xs: 14 },
                            color: theme => theme.palette.color1?.paper,
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: { md: 16, xs: 14 },
                            color: theme => theme.palette.color1?.paper,
                            lineHeight: 'normal',
                        }}
                    >
                        {weatherData.location.name}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        fontSize: { md: 32, xs: 24 },
                        fontWeight: 'bold',
                        color: theme => theme.palette.color1?.default
                    }}>
                    {dayOfWeek}
                </Box>
                <Box
                    sx={{
                        fontSize: { md: 14, xs: 12 },
                        mb: { md: 1, xs: 2 },
                        color: theme => theme.palette.color1?.default
                    }}>
                    {fullDate}
                </Box>

                <Box
                    sx={{
                        fontSize: { md: 36, xs: 26 },
                        fontWeight: 'bold',
                        color: theme => theme.palette.color1?.default,
                    }}>
                    {Math.round(weatherData.current.temp_c)}°C
                </Box>
                <Box
                    sx={{
                        fontSize: { md: 14, xs: 12 },
                        color: theme => theme.palette.color1?.default,
                    }}>
                    {t('high')}: {Math.round(weatherData.current.heatindex_c)}
                    {" "}
                    {t('low')}: {Math.round(weatherData.current.dewpoint_c)}
                </Box>
            </Box>

            {/* left box */}

            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start', direction: 'ltr', }}>

                <Box
                    component="img"
                    loading="lazy"
                    sx={{ height: 100 }}
                    alt={weatherData.current.condition.text}
                    src={`https:${weatherData.current.condition.icon}`}
                />
                <Box
                    sx={{
                        fontSize: { md: 32, xs: 24 },
                        color: theme => theme.palette.color1?.default,
                        textAlign: 'right',
                        overflow: 'hidden'
                    }}>
                    {simplifiedText}
                </Box>
                <Box component='span'
                    sx={{
                        direction: 'ltr',
                        fontSize: { md: 14, xs: 12 },
                        color: theme => theme.palette.color1?.default,
                        textAlign: 'right',
                        mt: 2,
                        display: 'inline-block'
                    }}>
                    <span style={{ direction: 'ltr', display: 'inline-block' }}>
                        {t('feelsLike')} <Box component='span' sx={{ direction: 'ltr', display: 'inline-block' }}>
                            {Math.round(weatherData.current.feelslike_c)}
                        </Box>
                    </span>
                </Box>
            </Box>
        </Stack>
    );
}