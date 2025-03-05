import styled from "styled-components";
import { useWeather } from "../../context/WeatherContext";
// Components
import SearchBar from "../SearchBar/SearchBar";
import Info from "../Info/Info";
import WeatherForecast from "../Forecast/Forecast";
import { FlexColumn } from "../../styles/Layout";

const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isCollapsed"].includes(prop), // Filter `fullWidth` prop
})<{ isCollapsed: boolean }>`
  width: ${(props) => (props.isCollapsed ? "0px" : "500px")};
  background: #2c3e50;
  padding: ${(props) => (props.isCollapsed ? "0" : "20px")};

  color: white;

  transition: width 0.3s ease-in-out;
  overflow: hidden;
  z-index: 1000;
  position: relative;
`;

const Sidebar = () => {
  const { isCollapsed } = useWeather();

  return (
    <>
      <SidebarContainer isCollapsed={isCollapsed}>
        {!isCollapsed && (
          <FlexColumn
            height="100%"
            alignItems="center"
            justifyContent="space-around"
          >
            <SearchBar />
            <Info />
            <WeatherForecast />
          </FlexColumn>
        )}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
