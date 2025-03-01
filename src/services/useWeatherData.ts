import { useQuery } from "@tanstack/react-query";
import { useWeather } from "../context/WeatherContext";

const fetchWeather = async (city: string, unit: "metric" | "imperial") => {
  if (!city) return null;
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
  );
  if (!res.ok) throw new Error("City not found");
  return res.json();
};

export const useWeatherData = () => {
  const { city, unit } = useWeather();

  return useQuery({
    queryKey: ["weather", city, unit],
    queryFn: () => fetchWeather(city, unit),
    enabled: !!city, // Prevents fetching if no city selected
  });
};
