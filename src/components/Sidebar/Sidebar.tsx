import { useState } from "react";
import styled from "styled-components";
// import Select from "react-select";

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

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // const handleCityChange = (selected: CityOption | null) => {
  //   if (selected) {
  //     setCity(selected.value);
  //     setCoordinates(selected.coords);
  //   }
  // };

  // console.log("data", data);

  return (
    <>
      <SidebarContainer isCollapsed={isCollapsed}>
        {!isCollapsed && (
          <>
            {/* <Select
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
            </select> */}

            <Info />
            <WeatherForecast />
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
