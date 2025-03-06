import React, { createContext, useContext, useEffect, useState } from "react";

// WeatherData interface for current weather
export interface WeatherData {
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
  sys: {
    country: string;
  };
}

// HourlyForecast interface for hourly weather forecast
export interface HourlyForecast {
  dt: number; // timestamp of the forecast
  temp: number;
  weather: { description: string }[];
  wind: {
    speed: number;
  };
}

// DailyForecast interface for daily weather forecast
export interface DailyForecast {
  dt: number; // timestamp of the forecast
  temp: {
    day: number;
    night: number;
  };
  weather: { description: string }[];
  wind: {
    speed: number;
  };
}

export interface WeatherContextType {
  currentWeather: WeatherData | null;
  hourlyForecast: HourlyForecast[] | null;
  dailyForecast: DailyForecast[] | null;
  setCity: (city: string) => void;
  setCountryCode: (countryCode: string) => void;
  coordinates: [number, number];
  setCoordinates: (coords: [number, number]) => void;
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
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[] | null>(
    null
  );
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[] | null>(
    null
  );

  // const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  // const [isCollapsed, setIsCollapsed] = useState(false);

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

          // Fetch Hourly Forecast
          const hourlyRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${apiKey}`
          );
          const hourlyData = await hourlyRes.json();
          setHourlyForecast(hourlyData);

          // Fetch Daily Forecast
          // const dailyRes = await fetch(
          //   `https://api.openweathermap.org/data/2.5/onecall?q=${city},${countryCode}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`
          // );
          // const dailyData = await dailyRes.json();
          // setDailyForecast(dailyData.daily);
          // console.log("dailyData", dailyData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      fetchWeatherData();
    }
  }, [city, countryCode, coordinates]);

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
