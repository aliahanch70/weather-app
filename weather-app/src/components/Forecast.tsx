import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useWeather } from "../contexts/WeatherContext";
import ScrollContainer from 'react-indiana-drag-scroll';
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from 'react-i18next';


export default function Forecast() {
  const theme = useTheme(); // Get the current theme to access its colors
  const { t, i18n } = useTranslation();
 const isFarsi = i18n.language === 'fa';

  const { weatherForecastData , loading , error} = useWeather();
  console.log('Forecast Data:', weatherForecastData?.forecast.forecastday.map((day: any) => day.date));


  if (error) {
    return (
      <Box sx={{ p: 2, minHeight: 327 }}>
        <Typography color="error" align="center">{error}</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ width: "100%", overflow: 'hidden', p: 2 , maxHeight: 327}}>
      <Typography sx={{ fontSize: 24, mb: 3, ml: 2, mt: '5px', textAlign: 'left', fontWeight: 'bold', color:theme => theme.palette.color1?.default }} >
        2 Weeks Forecast {weatherForecastData?.location?.name ? `for ${weatherForecastData.location.name}` : ''}

      </Typography>

      <Box
          sx={{
            display:'flex',
            gap: 2,
            m: 2,

            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none', // For Firefox

          }}>
            <Skeleton
              variant="rectangular"
              width='100px'
              height='200px'
              sx={{ borderRadius: '24px' }}
            />

            <Skeleton
              variant="rectangular"
              width='100px'
              height='200px'
              sx={{ borderRadius: '24px' }}
            />

            <Skeleton
              variant="rectangular"
              width='100px'
              height='200px'
              sx={{ borderRadius: '24px' }}
            />

            
          </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", overflow: 'hidden', p: 2 }}>
      <Typography sx={{ fontSize: 24, mb: 2, ml: 2, mt: '5px', textAlign: 'left', fontWeight: 'bold', color:theme => theme.palette.color1?.default }} >
        2 Weeks Forecast {weatherForecastData?.location?.name ? `for ${weatherForecastData.location.name}` : ''}

      </Typography>
      <ScrollContainer className="scroll-container">
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            m: 2,
            // 3. Add styles for better UX
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing',
            },
            // Hide the default scrollbar
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none', // For Firefox
            '-ms-overflow-style': 'none', // For Internet Explorer + Edge
          }}
        >
          {weatherForecastData?.forecast.forecastday.map((_: any, index: any) => (
            <Box
              key={index}
              sx={{ minWidth: 100, bgcolor: '#CDD9E0', p: 2, borderRadius: '24px', textAlign: 'center', backgroundColor: theme => theme.palette.background2?.paper ?? '#CDD9E0' }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme => theme.palette.color1?.default }}>
                {index == 0 ? `${t('today')}` : new Date(_.date).toLocaleDateString(isFarsi ? 'fa-IR' : 'en-GB', 
        {
             weekday: isFarsi? 'long': 'short',
        calendar: isFarsi ? 'persian' : 'gregory' 
        })}
              </Typography>
              <Divider sx={{
                border: 'none',
                height: '2px',
                background: `linear-gradient(to right, transparent, ${theme.palette.divider}, transparent)`,
              }} />
              <Box
                component="img"
                sx={{ height: 50, my: 3 }}
                alt={` ${_.day.condition.text}`}
                src={`https:${_.day.condition.icon}`}
              />
              <Typography variant="body1" sx={{ color: theme => theme.palette.color1?.default }}><strong>{Math.round(_.day.avgtemp_c)}°C</strong></Typography>
            </Box>
          ))}
        </Box>

      </ScrollContainer>
    </Box>
  );
}