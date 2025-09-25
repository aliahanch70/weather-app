import axios from 'axios';
import { format } from 'date-fns';


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 
const BASE_URL = 'https://api.weatherapi.com/v1';

//  تولید تاریخ اولین روز ۱۲ ماه ظ
const getLast12MonthsDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < 12; i++) {
    // ماه حجاری تا 11 ماه پیش
    const targetDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    dates.push(format(targetDate, 'yyyy-MM-dd'));
  }
  
  return dates.reverse(); // آرایه را برعکس می‌کنیم 
};

// تابع اصلی برای دریافت دیتای ۱۲ ماه گذشته
export const getMonthlyHistory = async (city: string) => {
  const dates = getLast12MonthsDates();
  
  // برای هر تاریخ یک درخواست API ایجاد می‌کنیم
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
    // انتظار برای پایان درخواست
    const responses = await Promise.all(requests);
    
    // نتایج را پردازش و به فرمت مناسب برای چارت تبدیل می‌کنیم
    const chartData = responses.map(response => {
      const forecastDay = response.data.forecast.forecastday[0];
      const date = new Date(forecastDay.date);
      const monthName = format(date, 'MMM'); // نام کوتاه ماه 

      return {
        month: monthName,
        avgTemp: Math.round(forecastDay.day.avgtemp_c),
      };
    });

    return chartData;

  } catch (error) {
    console.error("Failed to fetch monthly history:", error);
    throw new Error('Could not fetch historical data. The city might not be available or the date is out of range.');
  }
};