import { useState } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { City, useCity } from "../context/CityContext";
import { useCitySearch } from "../hooks/useCitySearch";

const SidebarWrapper = styled.div<{ $collapsed: boolean }>`
  position: absolute;
  left: ${({ $collapsed }) => ($collapsed ? "-250px" : "0")};
  top: 0;
  height: 100vh;
  width: 250px;
  background: white;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: -40px;
  top: 20px;
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:hover {
    background: #f0f0f0;
  }
`;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");

  const { data: suggestions = [], isFetching, error } = useCitySearch(query);
  const { setSelectedCity } = useCity();

  return (
    <SidebarWrapper $collapsed={collapsed}>
      <ToggleButton onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
      </ToggleButton>
      <h2>Weather Map</h2>
      <SearchInput
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isFetching && <p>Loading...</p>}
      {error && <p>Error fetching cities</p>}
      <SuggestionsList>
        {suggestions?.map((city: City, index: number) => (
          <SuggestionItem
            key={index}
            onClick={() =>
              // console.log(`Selected: ${city.name}, ${city.lat}, ${city.lon}`)
              setSelectedCity(city)
            }
          >
            {city.name}
          </SuggestionItem>
        ))}
      </SuggestionsList>
    </SidebarWrapper>
  );
};

export default Sidebar;
