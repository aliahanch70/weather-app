import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import { useWeather } from "../contexts/WeatherContext";
import ScrollContainer from 'react-indiana-drag-scroll';


export default function Forecast() {
  const { weatherForecastData } = useWeather();
  console.log('Forecast Data:', weatherForecastData?.forecast.forecastday.map((day: any) => day.date));

  return (
    <Box sx={{ width: "100%", overflow: 'hidden', p: 2 }}>
      <Typography sx={{ fontSize: 24, mb: 4, ml: 2, mt: 1, textAlign: 'left', fontWeight: 'bold', color: "#202224ff" }} >
        2 Weeks Forecast {weatherForecastData?.location?.name ? `for ${weatherForecastData.location.name}` : ''}

      </Typography>
      <ScrollContainer className="scroll-container" style={{ marginRight: '8px' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            m: 2,
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing',
            },
            '& > :last-child': {
              paddingRight: '16px',
            },
            // Hide the default scrollbar
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          }}
        >
          {weatherForecastData?.forecast.forecastday.map((_: any, index: any) => (
            <Box
              key={index}
              sx={{ minWidth: 70, bgcolor: '#CDD9E0', p: 2, borderRadius: '24px', maxWidth: 15, textAlign: 'center', }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "#003464" }}>
                {index == 0 ? 'Today' : new Date(_.date).toLocaleDateString('en-GB', { weekday: 'short' })}
              </Typography>
              <Divider sx={{ my: 1, borderColor: '#999' }} />
              <Box
                component="img"
                sx={{ height: 50, my: 3 }}
                alt={` ${_.day.condition.text}`}
                src={`https:${_.day.condition.icon}`}
              />
              <Typography variant="body1" sx={{ pb: 2, color: "#003464" }}><strong>{Math.round(_.day.avgtemp_c)}°C</strong></Typography>
            </Box>
          ))}
        </Box>

      </ScrollContainer>
    </Box>
  );
}