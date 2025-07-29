import React, { createContext, useContext, useEffect, useState } from "react";
// import { useFetchWeatherByCity } from "../hooks/useFetchWeatherByCity";
// import { useFetchWeatherByCoords } from "../hooks/useFetchWeatherByCoords";
import { processDailyForecast } from "../utils/forecastHelpers";

// Interfaces
import {
  WeatherData,
  DailyForecast,
  HourlyForecast,
  // ForecastItem,
} from "../types/weather";

// interface ForecastItem {
//   dt: number;
//   main: {
//     temp: number;
//     feels_like?: number;
//     temp_min?: number;
//     temp_max?: number;
//     pressure?: number;
//     humidity?: number;
//     temp_kf?: number;
//   };
//   weather: {
//     id?: number;
//     main?: string;
//     description: string;
//     icon: string;
//   }[];
//   wind: {
//     speed: number;
//     deg?: number;
//     gust?: number;
//   };
//   dt_txt?: string;
// }

export interface WeatherContextType {
  currentWeather: WeatherData | null;
  hourlyForecast: HourlyForecast[] | null;
  dailyForecast: DailyForecast[] | null;
  setCity: (city: string) => void;
  setCountryCode: (countryCode: string) => void;
  coordinates: [number, number];
  setCoordinates: (coords: [number, number]) => void;
  unit: "metric" | "imperial";
  setUnit: (unit: "metric" | "imperial") => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  toggleCollapsed: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState("Sydney");
  const [countryCode, setCountryCode] = useState("AU");
  const [coordinates, setCoordinates] = useState<[number, number]>([
    -33.8688, 151.2093,
  ]);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[] | null>(
    null
  );
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[] | null>(
    null
  );

  // Toggle collapsed state
  const toggleCollapsed = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Fetch weather data based on city and country code
  useEffect(() => {
    if (city && countryCode) {
      const fetchWeatherData = async () => {
        try {
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

          // Fetch Current Weather
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${apiKey}`
          );
          const weatherData = await weatherRes.json();
          setCurrentWeather(weatherData);

          // Fetch Hourly Forecast + Daily Forecast
          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${apiKey}`
          );
          const forecastData = await forecastRes.json();
          setHourlyForecast(forecastData);

          const dailySummaries = processDailyForecast(forecastData.list);
          console.log("dailySummaries", forecastData.list);
          setDailyForecast(dailySummaries);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      fetchWeatherData();
    }
  }, [city, countryCode]);

  useEffect(() => {
    if (coordinates) {
      const fetchWeatherByCoords = async () => {
        try {
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
          const [lat, lon] = coordinates;

          // Fetch Current Weather by lat/lon
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
          );
          const weatherData = await weatherRes.json();
          setCurrentWeather(weatherData);

          // Fetch Hourly & Daily Forecast by lat/lon
          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
          );
          const forecastData = await forecastRes.json();
          setHourlyForecast(forecastData);

          const dailySummaries = processDailyForecast(forecastData.list);
          setDailyForecast(dailySummaries);
        } catch (error) {
          console.error("Error fetching weather by coordinates:", error);
        }
      };

      fetchWeatherByCoords();
    }
  }, [coordinates]); // ✅ Runs only when coordinates change

  return (
    <WeatherContext.Provider
      value={{
        coordinates,
        currentWeather,
        hourlyForecast,
        dailyForecast,
        setCity,
        setCountryCode,
        setCoordinates,
        unit,
        setUnit,
        isCollapsed,
        setIsCollapsed,
        toggleCollapsed,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeather must be used within a WeatherProvider");
  return context;
};
