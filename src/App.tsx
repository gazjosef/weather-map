import "./utils/fixLeafletIcons"; // Adjust the path as needed

import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";
import { WeatherProvider } from "./context/WeatherContext";
import { CenteredGrid, Flex } from "./styles/Layout";

export const AppContainer = styled.main`
  width: 100rem;

  background: #2c3e50;
  border: 1px solid rgba(220, 220, 220, 0.5);
  border-radius: 20px;
  overflow: hidden;
`;

function App() {
  return (
    <WeatherProvider>
      <GlobalStyles />
      <CenteredGrid fullScreen>
        <AppContainer>
          <Flex fullWidth height="60rem">
            <Sidebar />
            <Map />
          </Flex>
        </AppContainer>
      </CenteredGrid>
    </WeatherProvider>
  );
}

export default App;
