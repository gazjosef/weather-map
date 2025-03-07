// import { useWeather } from "../../context/WeatherContext";
// Components
import SearchBar from "../SearchBar/SearchBar";
import Info from "../Info/Info";
import WeatherForecast from "../Forecast/Forecast";
import Daily from "../Daily/Daily";
// Styles
import { FlexColumn } from "../../styles/Layout";
import { SidebarContainer } from "./Sidebar.styles";

const Sidebar = () => {
  // const { isCollapsed } = useWeather();

  const isCollapsed = false;

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
            <Daily />
          </FlexColumn>
        )}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
