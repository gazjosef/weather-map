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
  coord: { lat: number; lon: number };
}

// Helper function to fetch city suggestions
const fetchCitySuggestions = async (query: string) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&appid=${apiKey}`
  );
  const data = await res.json();
  return data.list || [];
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; country: string; coord: { lat: number; lon: number } }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCity, setCoordinates } = useWeather();

  // Fetch city suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchCitySuggestions(searchTerm);
        const filteredSuggestions = result.filter(
          (city: City) => city.country && city.name // Filter out incomplete data
        );
        setSuggestions(filteredSuggestions);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch city suggestions.");
      } finally {
        setLoading(false);
      }
    };

    // Delay the fetch to improve performance (debounce)
    const timeoutId = setTimeout(fetchSuggestions, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle search
  const handleSearch = async (city: string) => {
    if (!city.trim()) return; // Prevent empty searches

    // Find the city from suggestions
    const selectedCity = suggestions.find((s) => s.name === city);
    if (selectedCity) {
      setCity(city); // Update city in context
      setCoordinates([selectedCity.coord.lat, selectedCity.coord.lon]); // Update coordinates in context
      setSearchTerm(""); // Clear input after search
    }
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
      <SearchButton onClick={() => handleSearch(searchTerm)}>
        <FaSearch />
      </SearchButton>

      {loading && searchTerm && <div>Loading suggestions...</div>}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.coord.lat + suggestion.coord.lon} // Unique key based on coordinates
              onClick={() => handleSearch(suggestion.name)}
            >
              {suggestion.name}, {suggestion.country}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}

      {suggestions.length === 0 && searchTerm && !loading && (
        <div>No suggestions found.</div>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
