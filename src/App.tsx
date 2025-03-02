import "./App.css";
// import { CityProvider } from "./context/CityContext";
import { WeatherProvider } from "./context/WeatherContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";
import { CenteredGrid, Flex } from "./styles/Layout";

function App() {
  return (
    <WeatherProvider>
      <CenteredGrid>
        <Flex>
          <Sidebar />
          <Map />
        </Flex>
      </CenteredGrid>
    </WeatherProvider>
  );
}

export default App;
