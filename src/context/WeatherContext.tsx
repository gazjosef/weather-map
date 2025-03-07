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
  weather: { description: string; icon: string }[];
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
  weather: { description: string; icon: string }[];
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

const processDailyForecast = (
  forecastList: {
    dt: number;
    main: { temp: number };
    wind: { speed: number };
    weather: { description: string; icon: string }[];
  }[]
): DailyForecast[] => {
  const dailyMap = new Map<
    number,
    {
      temps: number[];
      windSpeeds: number[];
      descriptions: string[];
      icons: string[];
    }
  >();

  const currentDate = new Date().setHours(0, 0, 0, 0);

  // Filter out the current day from the forecast list
  const filteredForecastList = forecastList.filter(
    (entry) => new Date(entry.dt * 1000).setHours(0, 0, 0, 0) > currentDate
  );

  filteredForecastList.forEach((entry) => {
    const date = new Date(entry.dt * 1000).setHours(0, 0, 0, 0); // Normalize to day start
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        temps: [],
        windSpeeds: [],
        descriptions: [],
        icons: [],
      });
    }

    const dayData = dailyMap.get(date)!;
    dayData.temps.push(entry.main.temp);
    dayData.windSpeeds.push(entry.wind.speed);
    dayData.descriptions.push(entry.weather[0].description);
    dayData.icons.push(entry.weather[0].icon);
  });

  // Sort the entries by date in ascending order (earliest to latest)
  const sortedForecast = Array.from(dailyMap.entries()).sort(
    ([dtA], [dtB]) => dtA - dtB
  );

  // Ensure you only return the first 5 days of forecast data
  return sortedForecast.slice(0, 5).map(([dt, data]) => ({
    dt,
    temp: {
      day: Math.max(...data.temps), // Use max temp for the day
      night: Math.min(...data.temps), // Use min temp for night estimate
    },
    weather: [
      {
        description: mostFrequent(data.descriptions),
        icon: mostFrequent(data.icons),
      },
    ],
    wind: {
      speed: average(data.windSpeeds),
    },
  }));
};

// Helper function: Find most frequent weather description
const mostFrequent = (arr: string[]) => {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop()!;
};

// Helper function: Calculate average
const average = (arr: number[]) =>
  arr.reduce((sum, val) => sum + val, 0) / arr.length;

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

          // Fetch Hourly Forecast + Daily Forecast
          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${apiKey}`
          );
          const forecastData = await forecastRes.json();
          setHourlyForecast(forecastData);

          const dailySummaries = processDailyForecast(forecastData.list);
          setDailyForecast(dailySummaries);
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
