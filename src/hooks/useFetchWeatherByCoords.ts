// hooks/useFetchWeatherByCoords.ts
import { useEffect } from "react";
import { WeatherData, ForecastItem, DailyForecast } from "../types/weather";
import { processDailyForecast } from "../utils/forecastHelpers";

export const useFetchWeatherByCoords = (
  coordinates: [number, number],
  setCurrentWeather: (data: WeatherData) => void,
  setHourlyForecast: (data: ForecastItem[]) => void,
  setDailyForecast: (data: DailyForecast[]) => void
) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lat, lon] = coordinates;
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

        const resWeather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const weatherData = await resWeather.json();
        setCurrentWeather(weatherData);

        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const forecastData = await resForecast.json();
        setHourlyForecast(forecastData);
        setDailyForecast(processDailyForecast(forecastData.list));
      } catch (err) {
        console.error("Error fetching by coordinates:", err);
      }
    };

    if (coordinates) fetchData();
  }, [coordinates, setCurrentWeather, setHourlyForecast, setDailyForecast]);
};
