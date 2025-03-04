import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";
import { WeatherProvider } from "./context/WeatherContext";
import { CenteredGrid, Flex } from "./styles/Layout";
import GlobalStyles from "./styles/GlobalStyles";

import styled from "styled-components";

export const AppContainer = styled.main`
  width: 80rem;

  border: 1px solid #000;
  border-radius: 50px;
  overflow: hidden;
`;

function App() {
  return (
    <WeatherProvider>
      <GlobalStyles />
      <CenteredGrid fullScreen>
        <AppContainer>
          <Flex fullWidth height="80vh">
            <Sidebar />
            <Map />
          </Flex>
        </AppContainer>
      </CenteredGrid>
    </WeatherProvider>
  );
}

export default App;
