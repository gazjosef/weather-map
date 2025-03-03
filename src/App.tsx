// import "./App.css";
// import { CityProvider } from "./context/CityContext";
import { WeatherProvider } from "./context/WeatherContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";
import { CenteredGrid, Flex } from "./styles/Layout";

import styled from "styled-components";

export const AppContainer = styled.main`
  /* padding: 2rem; */
  width: 80vw;
`;

function App() {
  return (
    <WeatherProvider>
      <CenteredGrid fullScreen>
        <AppContainer>
          <Flex fullWidth>
            <Sidebar />
            <Map />
          </Flex>
        </AppContainer>
      </CenteredGrid>
    </WeatherProvider>
  );
}

export default App;
