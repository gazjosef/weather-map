import "./App.css";
// import { CityProvider } from "./context/CityContext";
import { WeatherProvider } from "./context/WeatherContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";
import { CenteredGrid, Flex } from "./styles/Layout";

import styled from "styled-components";

export const AppContainer = styled.main`
  padding: 2rem;
`;

function App() {
  return (
    <AppContainer>
      <WeatherProvider>
        <CenteredGrid fullScreen>
          <Flex fullWidth>
            <Sidebar />
            <Map />
          </Flex>
        </CenteredGrid>
      </WeatherProvider>
    </AppContainer>
  );
}

export default App;
