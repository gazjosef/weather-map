import { useWeather } from "../../context/useWeather";
// Components
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../Logo/Logo";
import WeatherForecast from "../Forecast/Forecast";
import Daily from "../Daily/Daily";
// Styles
import { FlexColumn } from "../../styles/Layout";
import { SidebarContainer } from "./Sidebar.styles";

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
            <Logo />
            <SearchBar />
            <WeatherForecast />
            <Daily />
          </FlexColumn>
        )}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
