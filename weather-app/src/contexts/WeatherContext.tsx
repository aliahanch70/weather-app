import React, { createContext, useState, useEffect, useContext } from 'react';
import { getWeather } from '../services/api'; // فرض می‌کنیم این سرویس API شماست
import type { ReactNode } from 'react';

// 1. تعریف نوع داده‌ای که به اشتراک گذاشته می‌شود
interface WeatherContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  weatherData: any;
  loading: boolean;
  error: string | null;
}

// 2. ساخت Context
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// 3. ساخت Provider با منطق کامل
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('San Francisco');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 4. افکتی که با تغییر searchQuery، دیتای جدید را fetch می‌کند
useEffect(() => {
    if (!searchQuery) return;

    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getWeather(searchQuery);

        // ---  مهم: پاسخ دریافتی را اینجا لاگ می‌کنیم ---
        console.log('✅ API Success Response:', response.data); 
        console.log(response.data.current.condition.text);

        setWeatherData(response.data);
      } catch (err) {
        // --- مهم: خطای دریافتی را اینجا لاگ می‌کنیم ---
        console.error('❌ API Call Failed:', err); 

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchQuery]);

  const value = { searchQuery, setSearchQuery, weatherData, loading, error };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

// 5. ساخت هوک سفارشی
export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};