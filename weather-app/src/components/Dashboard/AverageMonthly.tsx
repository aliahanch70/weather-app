import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useWeather } from '../../contexts/WeatherContext';
import { getMonthlyHistory } from '../../services/apiAvg';
import { useTranslation } from 'react-i18next';

export default function MonthlyAverageChart() {
  const { searchQuery } = useWeather();
  const [chartData, setChartData] = useState<{ month: string; avgTemp: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const isFarsi = i18n.language === 'fa';

  useEffect(() => {
    const fetchHistoryData = async () => {
      if (!searchQuery) return;
      try {
        setLoading(true);
        setError(null);
        // current language for API function
        const data = await getMonthlyHistory(searchQuery, i18n.language);
        setChartData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistoryData();
  }, [searchQuery, i18n.language]);

  if (loading) {
    return (
      <Box sx={{ minHeight: 234, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Historical Data for {searchQuery}...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: 234, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography sx={{ fontSize: 18, fontWeight: 'bold', my: 1, ml: 2, textAlign: 'left', color: theme => theme.palette.color1?.default }}>
        {t('monthlyAverages')}
      </Typography>
      <Box sx={{ width: '100%' , fontSize:10 }}>
        <LineChart

          height={180}
          dataset={chartData}

          xAxis={[{
            scaleType: 'point',
            dataKey: 'month',
            tickSize:5,
            disableLine: true,
            disableTicks: true,
          }]}
          series={[{
            dataKey: 'avgTemp',
            area: true,
            color: 'url(#lineGradient)',
          }]}
          yAxis={[{
            disableLine: true,
            disableTicks: true,
            position: isFarsi ? 'right' : 'left',
            valueFormatter: (value: any) => `${value}°C`,
          }]}
          grid={{ horizontal: true, vertical: false }}
        >
          {/* SVG Gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="40%" stopColor="#f03232ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1879beff" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </LineChart>
      </Box>
    </>
  );
}