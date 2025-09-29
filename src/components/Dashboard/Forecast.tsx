import { Box, Divider, Typography, useTheme, Skeleton } from '@mui/material';
import { useWeather } from "../../contexts/WeatherContext";
import ScrollContainer from 'react-indiana-drag-scroll';
import { useTranslation } from 'react-i18next';
import NetworkCheckOutlinedIcon from '@mui/icons-material/NetworkCheckOutlined';

export default function Forecast() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const isFarsi = i18n.language === 'fa';
  const { weatherForecastData, loading, error } = useWeather();

  // error State
  if (error) {
    return (
      <Box
        sx={{
          minHeight: { md: 310, xs: 248 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color="error">
          <NetworkCheckOutlinedIcon />
        </Typography>
      </Box>
    );
  }

  // loading State
  if (loading) {
    return (
      <Box sx={{ width: "100%", p: { md: 2, xs: 1 }, height: { md: 310, xs: 248 } }}>
        <Typography
          sx={{
            fontSize: { md: 24, xs: 18 },
            mt: 1,
            mb: 2,
            ml: { md: 2, xs: 0 },
            fontWeight: 'bold',
            color: theme.palette.color1?.default,
            textAlign: 'left',
          }}
        >
          {t('2weekforecast')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, ml: { md: 2, xs: 0 } }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={100}
              height={200}
              sx={{ borderRadius: 3 }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  // forecast data
  return (
    <Box sx={{ width: "100%", p: { md: 2, xs: 1 } }}>
      <Typography
        sx={{
          fontSize: { md: 24, xs: 18 },
          mb: { md: 2, xs: 1 },
          ml: { md: 2, xs: 0 },
          mt: 1,
          fontWeight: 'bold',
          color: theme.palette.color1?.default,
          textAlign: 'left',
        }}
      >
        {t('2weekforecast')}
      </Typography>

      <ScrollContainer>
        <Box
          sx={{
            display: 'flex',
            gap: { md: 2, xs: 1 },
            m: { md: 2, xs: 0 },
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {weatherForecastData?.forecast.forecastday.map((day: any, index: number) => (
            <Box
              key={index}
              sx={{
                minWidth: 100,
                p: 2,
                borderRadius: 6,
                textAlign: 'center',
                backgroundColor: theme.palette.background2?.paper ?? '#CDD9E0',
              }}
            >
              <Typography
                sx={{
                  fontSize: { md: 16, xs: 14 },
                  fontWeight: 'bold',
                  color: theme.palette.color1?.default,
                }}
              >
                {index === 0
                  ? t('today')
                  : new Date(day.date).toLocaleDateString(isFarsi ? 'fa-IR' : 'en-GB', {
                      weekday: isFarsi ? 'long' : 'short',
                      calendar: isFarsi ? 'persian' : 'gregory',
                    })}
              </Typography>

              <Divider
                sx={{
                  border: 'none',
                  height: 2,
                  my: 1,
                  background: `linear-gradient(to right, transparent, ${theme.palette.divider}, transparent)`,
                }}
              />

              <Box
                component="img"
                loading="lazy"
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                sx={{ height: { md: 50, xs: 45 }, my: 2 }}
              />

              <Typography
                sx={{
                  fontSize: { md: 16, xs: 14 },
                  color: theme.palette.color1?.default,
                }}
              >
                <strong>{Math.round(day.day.avgtemp_c)}°C</strong>
              </Typography>
            </Box>
          ))}
        </Box>
      </ScrollContainer>
    </Box>
  );
}
