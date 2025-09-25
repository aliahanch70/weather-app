import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useWeather } from '../contexts/WeatherContext';
import NetworkCheckOutlinedIcon from '@mui/icons-material/NetworkCheckOutlined';
import { useTranslation } from 'react-i18next';


//ساده‌سازی شرایط آب و هوا
const simplifyWeatherCondition = (text: string): string => {
    if (!text) return 'Unknown';
    const lowerCaseText = text.toLowerCase();
    // const { t } = useTranslation();

    if (lowerCaseText.includes('sun') || lowerCaseText.includes('clear')) {
        return `Sunny`;
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

    // اگر هیچ یک از شرایط بالا مطابقت نداشت، فقط اولین کلمه را برگردان
    return text.split(' ')[0];
};

export default function WeatherNow() {
    const { weatherData, loading, error, searchQuery } = useWeather();
    const simplifiedText = simplifyWeatherCondition(weatherData?.current.condition.text);
    const { t, i18n } = useTranslation();

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
                <Typography color="error" align="center"><NetworkCheckOutlinedIcon />{error}</Typography>
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
        isFarsi ? 'fa-IR' : 'en-GB', // بر اساس زبان، منطقه را انتخاب کن
        {
            weekday: 'long',
            calendar: isFarsi ? 'persian' : 'gregory' // مهم: نوع تقویم را مشخص کن
        }
    );

    const fullDateFormatter = new Intl.DateTimeFormat(
        isFarsi ? 'fa-IR' : 'en-GB',
        {
            day: 'numeric',
            month: isFarsi ? 'long' : 'short', // نام کامل ماه در فارسی
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: !isFarsi, // حالت ۱۲ ساعته فقط برای انگلیسی
            calendar: isFarsi ? 'persian' : 'gregory'
        }
    );

    const dayOfWeek = dayOfWeekFormatter.format(localTime);
    const fullDate = fullDateFormatter.format(localTime);

    return (

        <Stack direction="row" spacing={2} sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center' }} maxHeight={234} >
            <Box sx={{ color: "", textAlign: 'left' }}>

                <Box sx={{ display: "flex", alignItems: 'center', fontSize: 16, mb: 1, gap: 0.5, bgcolor: "#CDD9E0", borderRadius: 5, width: "fit-content", px: 2, py: 1 }} >
                    <LocationOnIcon sx={{ fontSize: 20, color: theme => theme.palette.color1?.paper }} />
                    <Typography sx={{ color: theme => theme.palette.color1?.paper }}>{weatherData.location.name}</Typography>
                </Box>

                <Box sx={{ fontSize: 32, fontWeight: 'bold', color: theme => theme.palette.color1?.default }}>{dayOfWeek}</Box>
                <Box sx={{ fontSize: 14, mb: 1, color: theme => theme.palette.color1?.default }}>{fullDate}</Box>

                <Box sx={{ fontSize: 36, fontWeight: 'bold', color: theme => theme.palette.color1?.default, }}>{Math.round(weatherData.current.temp_c)}°C</Box>
                <Box sx={{ fontSize: 14, color: theme => theme.palette.color1?.default, textAlign: 'left' }}>{t('high')} {weatherData.current.heatindex_c}</Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'flex-end' }}>


                <Box component="img" sx={{ height: 100 }} alt={weatherData.current.condition.text} src={`https:${weatherData.current.condition.icon}`} />
                <Box sx={{ fontSize: 32, color: theme => theme.palette.color1?.default, textAlign: 'right', wordWrap: 'break-word', overflow: 'hidden' }}>{simplifiedText}</Box>
                <Box component='span' sx={{ fontSize: 14, color: theme => theme.palette.color1?.default, textAlign: 'right', mt: 2 }}>
                    {t('feelsLike')} {Math.round(weatherData.current.feelslike_c)}
                </Box>
            </Box>
        </Stack>
    );
}