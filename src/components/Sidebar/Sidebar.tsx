import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { City, useCity } from "../../context/CityContext";
import { useCitySearch } from "../../hooks/useCitySearch";
import { SidebarWrapper, ToggleButton } from "./Sidebar.styles";
import { SearchInput, SuggestionsList, SuggestionItem } from "./Search.styles";

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
