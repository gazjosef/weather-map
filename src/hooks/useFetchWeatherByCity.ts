import { useEffect, useState } from "react";
import { WeatherData, ForecastItem } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export function useFetchWeatherByCity(
  city: string,
  countryCode: string,
  unit: "metric" | "imperial"
) {
  const [current, setCurrent] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem | null>(null);

  useEffect(() => {
    if (!city || !countryCode || !API_KEY) return;

    const fetchWeatherData = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=${unit}&appid=${API_KEY}`
        );
        const data = await res.json();
        setCurrent(data);
      } catch (error) {
        console.error("Error fetching current weather by city:", error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=${unit}&appid=${API_KEY}`
        );
        const data = await res.json();
        setForecast(data);
      } catch (error) {
        console.error("Error fetching forecast by city:", error);
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, [city, countryCode, unit]);

  return { current, forecast };
}
