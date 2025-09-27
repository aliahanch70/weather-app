import axios from 'axios';
import { format } from 'date-fns';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
const BASE_URL = 'https://api.weatherapi.com/v1';

// تبدیل تاریخ به ماه شمسی با Intl
const toJalaliMonth = (date: Date): string => {
  return new Intl.DateTimeFormat('fa-IR', { month: 'long' }).format(date);
};

const getLast12MonthsDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < 12; i++) {
    const targetDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    dates.push(format(targetDate, 'yyyy-MM-dd'));
  }
  return dates.reverse();
};

export const getMonthlyHistory = async (city: string, lang: string) => {
  const dates = getLast12MonthsDates();
  
  const requests = dates.map(date => 
    axios.get(`${BASE_URL}/history.json`, {
      params: {
        key: API_KEY,
        q: city,
        dt: date,
      }
    })
  );

  try {
    const responses = await Promise.all(requests);
    
    const chartData = responses.map(response => {
      const forecastDay = response.data.forecast.forecastday[0];
      const date = new Date(forecastDay.date);

      const monthName = lang === 'fa'
        ? toJalaliMonth(date)   //  شمسی
        : format(date, 'MMM');  //  میلادی

      return {
        month: monthName,
        avgTemp: Math.round(forecastDay.day.avgtemp_c),
      };
    });

    return chartData;

  } catch (error) {
    console.error("Failed to fetch monthly history:", error);
    throw new Error('Could not fetch historical data.');
  }
};
