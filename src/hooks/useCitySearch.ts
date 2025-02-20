import { useQuery } from "@tanstack/react-query";

export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

const fetchCities = async (search: string) => {
  if (search.length < 2) return []; // Prevent unnecessary API calls
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  const data = await response.json();

  return data.map((city: City) => ({
    name: `${city.name}, ${city.country}`,
    lat: city.lat,
    lon: city.lon,
  }));
};

export const useCitySearch = (query: string) => {
  return useQuery({
    queryKey: ["cities", query],
    queryFn: () => fetchCities(query),
    enabled: query.length >= 2, // Fetch only if query is 2+ characters
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    retry: 1, // Retry once if the request fails
  });
};
