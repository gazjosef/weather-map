import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useWeather } from "../../context/WeatherContext";
import { useWeatherData } from "../../services/useWeatherData";
import WeatherForecast from "../Forecast/Forecast";
import Info from "../Info/Info";

const SidebarContainer = styled.div<{ isCollapsed: boolean }>`
  width: ${(props) => (props.isCollapsed ? "0px" : "500px")};
  background: #2c3e50;
  padding: ${(props) => (props.isCollapsed ? "0" : "20px")};

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
  z-index: 2000;
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

const sampleData = [
  { dt: 1740990000, temp: 22.5, icon: "04d" },
  { dt: 1740993600, temp: 23.1, icon: "03d" },
  { dt: 1740997200, temp: 24.0, icon: "01d" },
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

  console.log("data", data);

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
                <Info />

                <WeatherForecast
                  hourlyData={sampleData}
                  timezoneOffset={39600}
                />
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
