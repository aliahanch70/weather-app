import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useWeather } from '../../contexts/WeatherContext';
import NetworkCheckOutlinedIcon from '@mui/icons-material/NetworkCheckOutlined';
import { useTranslation } from 'react-i18next';

export default function WeatherNow() {
    const { weatherData, loading, error, searchQuery } = useWeather();
    const { t, i18n } = useTranslation();

    // simplify weather condition text
    const simplifyWeatherCondition = (text: string): string => {
        if (!text) return 'Unknown';
        const lower = text.toLowerCase();

        if (lower.includes('sun') || lower.includes('clear')) return t('sun');
        if (lower.includes('cloud') || lower.includes('overcast')) return t('cloudy');
        if (lower.includes('rain') || lower.includes('drizzle')) return t('rain');
        if (lower.match(/snow|sleet|ice|blizzard/)) return t('s');
        if (lower.includes('thunder')) return t('thunder');
        if (lower.match(/mist|fog|haze/)) return t('mist');

        return text.split(' ')[0];
    };

    const simplifiedText = simplifyWeatherCondition(weatherData?.current.condition.text);

    //  Loading State 
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={4} sx={{ height: { md: 234, xs: 180 } }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading data for {searchQuery}...</Typography>
            </Box>
        );
    }

    // Error State 
    if (error) {
        return (
            <Box m={10} sx={{ height: { md: 234, xs: 200 } }} >
                <Typography color="error" align="center"><NetworkCheckOutlinedIcon fontSize='large' />{t('error')}</Typography>
            </Box>
        );
    }

    //  No Data State 
    if (!weatherData) {
        return (
            <Box p={4} sx={{ height: { md: 234, xs: 200 } }}>
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
            spacing={{ lg: 2, md: 1 }}
            sx={{
                px: { lg: 3, md: 2, xs: 1 },
                py: { lg: 3, md: 2, xs: 1 },
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            maxHeight={234}
        >

            {/* right box */}
            <Box sx={{ textAlign: 'left' }}>
                {/* Location */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        bgcolor: '#CDD9E0',
                        borderRadius: 5,
                        px: 2,
                        py: 0.5,
                        mb: 1,
                    }}
                >
                    <LocationOnIcon sx={{ fontSize: 16, color: theme => theme.palette.color1?.paper }} />
                    <Typography sx={{ fontSize: 14, color: theme => theme.palette.color1?.paper }}>
                        {weatherData.location.name}
                    </Typography>
                </Box>

                {/* Day & Date */}
                <Typography sx={{ fontSize: 28, fontWeight: 'bold', color: theme => theme.palette.color1?.default }}>
                    {dayOfWeek}
                </Typography>
                <Typography sx={{ fontSize: 14, mb: 1, color: theme => theme.palette.color1?.default }}>
                    {fullDate}
                </Typography>

                {/* Temp */}
                <Typography sx={{ fontSize: 32, fontWeight: 'bold', color: theme => theme.palette.color1?.default }}>
                    {Math.round(weatherData.current.temp_c)}°C
                </Typography>
                <Typography sx={{ fontSize: 14, color: theme => theme.palette.color1?.default }}>
                    {t('high')}: {Math.round(weatherData.current.heatindex_c)}  {t('low')}: {Math.round(weatherData.current.dewpoint_c)}
                </Typography>
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
                        fontSize: { lg: 32, md: 28, xs: 24 },
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