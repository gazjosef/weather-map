import React, { createContext, useContext, useState } from "react";

export interface WeatherContextType {
  unit: "metric" | "imperial";
  setUnit: (unit: "metric" | "imperial") => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <WeatherContext.Provider
      value={{
        unit,
        setUnit,
        isCollapsed,
        setIsCollapsed,
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
