import { useQuery } from "@tanstack/react-query";
import { useSearch } from "../hooks/useSearch";
import { useWeather } from "../context/WeatherContext";

// Define TypeScript interfaces for weather data and forecast
interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string }[];
  wind: {
    speed: number;
    deg: number;
  };
}

interface ForecastData {
  city: { name: string };
  list: {
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: { main: string; description: string }[];
    wind: {
      speed: number;
    };
  }[];
}

// Helper function to fetch data from API
const fetchDataFromAPI = async <T>(endpoint: string): Promise<T> => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/${endpoint}&appid=${apiKey}`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error ${res.status}: ${errorData.message}`);
  }

  return res.json();
};

// Fetch weather data using city and country code
const fetchWeather = async (
  city: string,
  countryCode: string,
  unit: "metric" | "imperial"
): Promise<WeatherData> => {
  if (!city || !countryCode) throw new Error("City or Country not provided");
  return fetchDataFromAPI<WeatherData>(
    `weather?q=${city},${countryCode}&units=${unit}`
  );
};

// Fetch weather forecast using city and country code
const fetchWeatherForecast = async (
  city: string,
  countryCode: string,
  unit: "metric" | "imperial"
): Promise<ForecastData> => {
  if (!city || !countryCode) throw new Error("City or Country not provided");
  return fetchDataFromAPI<ForecastData>(
    `forecast?q=${city},${countryCode}&units=${unit}`
  );
};

export const useWeatherData = () => {
  const { city, countryCode } = useSearch();
  const { unit } = useWeather();

  const currentWeatherQuery = useQuery({
    queryKey: ["currentWeather", city, countryCode, unit],
    queryFn: () => fetchWeather(city, countryCode, unit),
    enabled: !!city && !!countryCode,
    staleTime: 300000,
  });

  const forecastQuery = useQuery({
    queryKey: ["weatherForecast", city, countryCode, unit],
    queryFn: () => fetchWeatherForecast(city, countryCode, unit),
    enabled: !!city && !!countryCode,
    staleTime: 300000,
  });

  return {
    currentWeather: currentWeatherQuery.data,
    forecast: forecastQuery.data,
    isWeatherLoading: currentWeatherQuery.isLoading,
    isForecastLoading: forecastQuery.isLoading,
    currentError: currentWeatherQuery.error,
    forecastError: forecastQuery.error,
  };
};
