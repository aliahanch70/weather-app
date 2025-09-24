import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const getWeather = async (city: string) => {
  try {
    // Note: The key should be part of the request params, not hardcoded in the string
    const response = await apiClient.get('/current.json', {
      params: {
        key: API_KEY,
        q: city,
        aqi: 'no'
      }
    });
    return response;
  } catch (error) {
    // Check if the error is an Axios error with a response
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        // Create a more specific error for "Location not found"
        throw new Error(`Location not found: '${city}'. Please check the spelling.`);
      }
    }
    // For all other errors, throw a generic message
    throw new Error('An unexpected error occurred while fetching weather data.');
  }
};