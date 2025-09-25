import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const getWeather = async (city: string) => {
  try {
    const response = await apiClient.get('/current.json', {
      params: {
        key: API_KEY,
        q: city,
        aqi: 'no'
      }
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        throw new Error(`Location not found: '${city}'. Please check the spelling.`);
      }
    }
    throw new Error('An unexpected error occurred while fetching weather data.');
  }
};