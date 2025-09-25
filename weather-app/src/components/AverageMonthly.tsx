import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useWeather } from '../contexts/WeatherContext'; // دریافت نام شهر
import { getMonthlyHistory } from '../services/apiAvg'; 
import { useTranslation } from 'react-i18next';

export default function MonthlyAverageChart() {
  const { searchQuery } = useWeather(); // دریافت شهر جستجو شده از Context
  const [chartData, setChartData] = useState<{ month: string; avgTemp: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();


  useEffect(() => {
    // هر زمان شهر جستجو شده تغییر کرد، این تابع اجرا می‌شود
    const fetchHistoryData = async () => {
      if (!searchQuery) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getMonthlyHistory(searchQuery);
        setChartData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [searchQuery]); // searchQuery وابسته 

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
      <Box sx={{ width: '100%' }}>
        <LineChart
          
          height={180}
          dataset={chartData}
          xAxis={[{
            scaleType: 'point',
            dataKey: 'month',
            disableLine: true,
            disableTicks: true,
          }]}
          series={[{
            dataKey: 'avgTemp',
            area: true,
            color: 'url(#lineGradient)',
          }]}
          // yAxis={[{ valueFormatter: (value:any) => `${value}°C` }]}

          grid={{ horizontal: true, vertical: false }}
          yAxis={[{
            disableLine: true,
            disableTicks: true,
            tickLabelStyle: {
              fontSize: 14,
              
            },
            // اضافه کردن علامت '°C' به انتهای هر عدد
            valueFormatter: (value: any) => `${value}°C`,
          }]}
        >
          <defs>
            <linearGradient id="lineGradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="40%" stopColor="#eb5656ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#5796dfff" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </LineChart>
      </Box>
    </>
  );
}