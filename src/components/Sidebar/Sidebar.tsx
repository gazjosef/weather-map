import { useState } from "react";
import styled from "styled-components";
// Components
import SearchBar from "../SearchBar/SearchBar";
import Info from "../Info/Info";
import WeatherForecast from "../Forecast/Forecast";

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

  return (
    <>
      <SidebarContainer isCollapsed={isCollapsed}>
        {!isCollapsed && (
          <>
            <SearchBar />
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
