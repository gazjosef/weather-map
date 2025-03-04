import { useQuery } from "@tanstack/react-query";
import { useWeather } from "../context/WeatherContext";

const fetchCoordinates = async (city: string) => {
  if (!city) return null;
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  );
  const data = await response.json();
  return data.length > 0 ? { lat: data[0].lat, lon: data[0].lon } : null;
};

export const useCityCoordinates = () => {
  const { city, setCoordinates } = useWeather();

  return useQuery({
    queryKey: ["cityCoordinates", city],
    queryFn: () => fetchCoordinates(city),
    enabled: !!city, // Only fetch when city is set
    onSuccess: (data) => {
      console.log("Fetched coordinates:", data); // Debugging log
      if (data) setCoordinates([data.lat, data.lon]); // Update map
    },
    onError: (error) => {
      console.error("Error fetching coordinates:", error);
    },
  });
};
