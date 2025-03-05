import { useQuery } from "@tanstack/react-query";
import { useWeather } from "../context/WeatherContext";

// Define TypeScript interface for weather data
interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: { description: string }[];
}

// Fetch current weather data
const fetchWeather = async (
  city: string,
  unit: "metric" | "imperial"
): Promise<WeatherData> => {
  if (!city) throw new Error("City not provided");
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
  );

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
};
// Fetch forecast weather data (5-hour forecast)
const fetchWeatherForecast = async (
  city: string,
  unit: "metric" | "imperial"
) => {
  if (!city) return null;
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
  );

  if (!res.ok) throw new Error("City not found");

  // console.log(res.json());

  return res.json();
};

export const useWeatherData = () => {
  const { city, unit } = useWeather();

  const currentWeatherQuery = useQuery({
    queryKey: ["currentWeather", city, unit],
    queryFn: () => fetchWeather(city, unit),
    enabled: !!city, // Prevent fetching if no city selected
  });

  const forecastQuery = useQuery({
    queryKey: ["weatherForecast", city, unit],
    queryFn: () => fetchWeatherForecast(city, unit),
    enabled: !!city, // Prevent fetching if no city selected
  });

  return {
    currentWeather: currentWeatherQuery.data,
    forecast: forecastQuery.data,
    currentError: currentWeatherQuery.error,
    forecastError: forecastQuery.error,
  };
};
