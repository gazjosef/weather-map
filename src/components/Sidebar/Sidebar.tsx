import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useWeather } from "../../context/WeatherContext";
import { useWeatherData } from "../../services/useWeatherData";

const SidebarContainer = styled.div<{ isCollapsed: boolean }>`
  width: ${(props) => (props.isCollapsed ? "0px" : "300px")};
  height: 100vh;
  background: #2c3e50;
  padding: ${(props) => (props.isCollapsed ? "0" : "10px")};

  color: white;

  /* position: absolute; */
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  position: absolute;
  left: 300px;
  top: 10px;
  background: #34495e;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
`;

interface CityOption {
  label: string;
  value: string;
  coords: [number, number];
}

const cities: CityOption[] = [
  { label: "Sydney, AU", value: "Sydney, AU", coords: [-33.8688, 151.2093] },
  { label: "New York, US", value: "New York, US", coords: [40.7128, -74.006] },
  { label: "London, GB", value: "London, GB", coords: [51.5074, -0.1278] },
  { label: "Tokyo, JP", value: "Tokyo, JP", coords: [35.682839, 139.759455] },
];

const Sidebar = () => {
  const { city, setCity, unit, setUnit, setCoordinates } = useWeather();
  const { data, error } = useWeatherData();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCityChange = (selected: CityOption | null) => {
    if (selected) {
      setCity(selected.value);
      setCoordinates(selected.coords);
    }
  };

  return (
    <>
      <SidebarContainer isCollapsed={isCollapsed}>
        {!isCollapsed && (
          <>
            <Select
              options={cities}
              value={cities.find((c) => c.value === city)}
              onChange={handleCityChange}
              placeholder="Select a city..."
              getOptionLabel={(e) => e.label}
              getOptionValue={(e) => e.value}
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "metric" | "imperial")}
            >
              <option value="metric">°C</option>
              <option value="imperial">°F</option>
            </select>
            {error && <p>City not found</p>}
            {data && (
              <WeatherInfo>
                <p>
                  Temperature: {data.main.temp}°{unit === "metric" ? "C" : "F"}
                </p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>
                  Wind Speed: {data.wind.speed}{" "}
                  {unit === "metric" ? "m/s" : "mph"}
                </p>
                <p>{data.weather[0].description}</p>
              </WeatherInfo>
            )}
          </>
        )}
      </SidebarContainer>
      <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "☰" : "✖"}
      </ToggleButton>
    </>
  );
};

export default Sidebar;
