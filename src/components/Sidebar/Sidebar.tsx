import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  SidebarWrapper,
  ToggleButton,
  LayerControls,
  OpacitySlider,
} from "./Sidebar.styles";
import { SearchInput, SuggestionsList, SuggestionItem } from "./Search.styles";
import { useCity } from "../../context/CityContext";

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}
interface SidebarProps {
  layers: { rain: boolean; clouds: boolean; temp: boolean; wind: boolean };
  opacity: { rain: number; clouds: number; temp: number; wind: number };
  toggleLayer: (layer: keyof SidebarProps["layers"]) => void;
  updateOpacity: (layer: keyof SidebarProps["opacity"], value: number) => void;
  setView: (lat: number, lon: number) => void;
}

const Sidebar = ({
  layers,
  opacity,
  toggleLayer,
  updateOpacity,
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
    icon: string;
  } | null>(null);
  const { selectedCity, setSelectedCity } = useCity();

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (query.length > 2) {
      const fetchCities = async () => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
          );
          const data = await res.json();
          setSuggestions(
            data.map(
              (city: {
                name: string;
                country: string;
                lat: number;
                lon: number;
              }) => ({
                name: city.name,
                country: city.country,
                lat: city.lat,
                lon: city.lon,
              })
            )
          );
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
        }
      };
      fetchCities();
    } else {
      setSuggestions([]);
    }
  }, [query, apiKey]);

  useEffect(() => {
    if (selectedCity) {
      const fetchWeather = async () => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&appid=${apiKey}`
          );
          const data = await res.json();
          setWeather({
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          });
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      fetchWeather();
    }
  }, [selectedCity, apiKey]);

  return (
    <SidebarWrapper $collapsed={collapsed}>
      <ToggleButton onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
      </ToggleButton>
      <h2>Weather Layers</h2>
      <SearchInput
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SuggestionsList>
        {suggestions.map((city) => (
          <SuggestionItem
            key={`${city.name}-${city.country}`}
            onClick={() => setSelectedCity(city)}
          >
            {city.name}, {city.country}
          </SuggestionItem>
        ))}
      </SuggestionsList>
      {selectedCity && weather && (
        <div>
          <h3>{selectedCity.name}</h3>
          <p>
            {weather.temp}°C - {weather.description}
          </p>
          <img src={weather.icon} alt={weather.description} />
        </div>
      )}
      {Object.keys(layers).map((layer) => (
        <LayerControls key={layer}>
          <label>
            <input
              type="checkbox"
              checked={layers[layer as keyof typeof layers]}
              onChange={() => toggleLayer(layer as keyof typeof layers)}
            />
            {layer.charAt(0).toUpperCase() + layer.slice(1)}
          </label>
          {layers[layer as keyof typeof layers] && (
            <OpacitySlider
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={opacity[layer as keyof typeof opacity]}
              onChange={(e) =>
                updateOpacity(
                  layer as keyof typeof opacity,
                  parseFloat(e.target.value)
                )
              }
            />
          )}
        </LayerControls>
      ))}
    </SidebarWrapper>
  );
};

export default Sidebar;
