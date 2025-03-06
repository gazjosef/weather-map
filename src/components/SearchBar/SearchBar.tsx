import { useState, useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.6rem;
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  border: none;
  background: #3498db;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin-top: 5px;
  z-index: 10;
  color: black;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 1.2rem;
`;

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

    const timeoutId = setTimeout(fetchSuggestions, 500);
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
      <SearchButton
        disabled={!searchTerm.trim()}
        // onClick={() => handleSearch(searchTerm)}
      >
        <FaSearch />
      </SearchButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}

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
