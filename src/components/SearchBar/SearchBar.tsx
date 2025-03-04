import { useState, useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";
import { FaSearch } from "react-icons/fa"; // Arrow icons
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
  color: black;
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
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string }[]>([]);
  const { city, setCity, setCoordinates } = useWeather();

  // Debounce effect to delay API call
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${apiKey}`
      );
      const data = await response.json();
      setSuggestions(data.map((city: any) => ({ name: city.name })));
    }, 500); // Wait 500ms before searching

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Prevent empty searches
    setCity(searchTerm.trim()); // Update city in context
    setSearchTerm(""); // Clear input after search
    setSuggestions([]); // Clear suggestions after search
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
      <SearchButton onClick={handleSearch}>
        <FaSearch />
      </SearchButton>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => {
                setCity(suggestion.name);
                setSearchTerm("");
                setSuggestions([]);
              }}
            >
              {suggestion.name}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
