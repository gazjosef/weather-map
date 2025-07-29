import { useState, useEffect } from "react";
import { useWeather } from "../../context/useWeather";
import { FaSearch } from "react-icons/fa";
import {
  SearchButton,
  SearchContainer,
  SearchInput,
  SuggestionItem,
  SuggestionsList,
} from "./SearchBar.styles";

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

// Fetch city suggestions from OpenWeather's Geocoding API
const fetchCitySuggestions = async (query: string): Promise<City[]> => {
  if (!query) return [];
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  );
  const data = await res.json();
  console.log("data", data);
  return data.map((city: City) => ({
    name: city.name,
    country: city.country,
    lat: city.lat,
    lon: city.lon,
  }));
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setCity, setCountryCode, setCoordinates } = useWeather();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);

      console.log("loading", loading);
      try {
        const result = await fetchCitySuggestions(searchTerm);
        setSuggestions(result);
      } catch (err) {
        console.log("err", err);
        setError("Failed to fetch city suggestions.");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, loading]);

  const handleSearch = (city: City) => {
    console.log("city", city);
    setCity(city.name);
    setCountryCode(city.country);
    setCoordinates([city.lat, city.lon]);

    setSearchTerm("");
    setSuggestions([]);
  };

  if (error) {
    console.error(error);
  }

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Enter city..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      <SearchButton disabled={!searchTerm.trim()}>
        <FaSearch />
      </SearchButton>

      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={`${suggestion.lat},${suggestion.lon}`}
              onClick={() => handleSearch(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
