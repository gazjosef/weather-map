import { useEffect } from "react";
import { WeatherData, ForecastItem, DailyForecast } from "../types/weather";
import { processDailyForecast } from "../utils/forecastHelpers";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export function useFetchWeatherByCity(
  city: string,
  countryCode: string,
  unit: "metric" | "imperial",
  setCurrentWeather: (data: WeatherData) => void,
  setHourlyForecast: (data: ForecastItem[]) => void,
  setDailyForecast: (data: DailyForecast[]) => void
) {
  useEffect(() => {
    if (!city || !countryCode || !API_KEY) return;

    const fetchData = async () => {
      try {
        const resWeather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=${unit}&appid=${API_KEY}`
        );
        const weatherData = await resWeather.json();
        setCurrentWeather(weatherData);

        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=${unit}&appid=${API_KEY}`
        );
        const forecastData = await resForecast.json();
        setHourlyForecast(forecastData.list);
        setDailyForecast(processDailyForecast(forecastData.list));
      } catch (err) {
        console.error("Error fetching weather by city:", err);
      }
    };

    fetchData();
  }, [
    city,
    countryCode,
    unit,
    setCurrentWeather,
    setHourlyForecast,
    setDailyForecast,
  ]);
}
