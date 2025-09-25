import React, { createContext, useState, useEffect, useContext } from 'react';
import { getWeather } from '../services/api'; 
import type { ReactNode } from 'react';
import { getWeatherForecast } from '../services/apiForecast';



interface WeatherContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  weatherData: any;
  weatherForecastData: any;
  loading: boolean;
  error: string | null;
}

//  ساخت Context
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

//  ساخت Provider 
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('San Francisco');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherForecastData, setWeatherForecastData] = useState<any>(null);

  // 
useEffect(() => {
    if (!searchQuery) return;

    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getWeather(searchQuery);
        const responseForecast = await getWeatherForecast(searchQuery);


        console.log('API Success Response:', response.data ,responseForecast); 
        console.log(response.data.current.condition.text);

        setWeatherData(response.data);
        setWeatherForecastData(responseForecast.data);
      } catch (err) {
        console.error(' API Call Failed:', err); 

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
        setWeatherData(null);
        setWeatherForecastData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchQuery]);

  const value = { searchQuery, setSearchQuery, weatherData, weatherForecastData, loading, error };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};