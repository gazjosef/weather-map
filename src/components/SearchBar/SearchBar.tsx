import { useState } from "react";
import { useWeather } from "../../context/WeatherContext";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
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

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setCity } = useWeather();

  const handleSearch = () => {
    if (!searchTerm.trim()) return; // Prevent empty searches
    setCity(searchTerm.trim()); // Update city in context
    setSearchTerm(""); // Clear input after search
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
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
