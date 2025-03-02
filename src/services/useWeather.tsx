import { useQuery } from "@tanstack/react-query";
import { useCity } from "../context//CityContext"; // Import your context

const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Replace with your actual API key

const fetchWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const useWeather = () => {
  const { selectedCity } = useCity();

  return useQuery({
    queryKey: ["weather", selectedCity?.lat, selectedCity?.lon], // Unique key for caching
    queryFn: () =>
      selectedCity ? fetchWeather(selectedCity.lat, selectedCity.lon) : null,
    enabled: !!selectedCity, // Only fetch when a city is selected
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry failed requests twice
  });
};
