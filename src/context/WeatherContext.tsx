import React, { createContext, useContext, useState } from "react";
import { useFetchWeatherByCity } from "../hooks/useFetchWeatherByCity";
import { useFetchWeatherByCoords } from "../hooks/useFetchWeatherByCoords";

// Interfaces
import { WeatherData, DailyForecast, ForecastItem } from "../types/weather";

export interface WeatherContextType {
  currentWeather: WeatherData | null;
  hourlyForecast: ForecastItem[] | null;
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
  const [hourlyForecast, setHourlyForecast] = useState<ForecastItem[] | null>(
    null
  );
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[] | null>(
    null
  );

  // Toggle collapsed state
  const toggleCollapsed = () => {
    setIsCollapsed((prev) => !prev);
  };

  useFetchWeatherByCity(
    city,
    countryCode,
    unit,
    setCurrentWeather,
    setHourlyForecast,
    setDailyForecast
  );

  useFetchWeatherByCoords(
    coordinates,
    setCurrentWeather,
    setHourlyForecast,
    setDailyForecast
  );

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
