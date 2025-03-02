import React, { createContext, useContext, useState } from "react";

interface WeatherContextType {
  city: string;
  setCity: (city: string) => void;
  unit: "metric" | "imperial";
  setUnit: (unit: "metric" | "imperial") => void;
  coordinates: [number, number];
  setCoordinates: (coords: [number, number]) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState("Sydney, AU");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [coordinates, setCoordinates] = useState<[number, number]>([
    -33.8688, 151.2093,
  ]); // Sydney default

  return (
    <WeatherContext.Provider
      value={{ city, setCity, unit, setUnit, coordinates, setCoordinates }}
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
