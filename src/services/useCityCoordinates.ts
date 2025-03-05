import { useQuery } from "@tanstack/react-query";
import { useWeather } from "../context/WeatherContext";
import { useEffect } from "react";

// Define a type for the coordinates
interface Coordinates {
  lat: number;
  lon: number;
}

const fetchCoordinates = async (city: string): Promise<Coordinates | null> => {
  if (!city) return null;
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.length === 0) {
    throw new Error("City not found");
  }

  return { lat: data[0].lat, lon: data[0].lon };
};

// Use React Query with explicit types
export const useCityCoordinates = () => {
  const { city, setCoordinates } = useWeather();

  const { data, error, isLoading } = useQuery<Coordinates | null, Error>({
    queryKey: ["cityCoordinates", city],
    queryFn: () => fetchCoordinates(city),
    enabled: !!city,
  });

  // 🔹 Use useEffect to handle side effects like updating coordinates
  useEffect(() => {
    if (data) {
      console.log("Fetched coordinates:", data); // Debugging log
      setCoordinates([data.lat, data.lon]); // Update map
    }
  }, [data, setCoordinates]);

  // 🔹 Handle errors separately
  useEffect(() => {
    if (error) {
      console.error("Error fetching coordinates:", error.message);
    }
  }, [error]);

  return { data, error, isLoading };
};
