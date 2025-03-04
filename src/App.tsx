import Sidebar from "./components/Sidebar/Sidebar";
import Map from "./components/Map/Map";
import { WeatherProvider } from "./context/WeatherContext";
import { CenteredGrid, Flex } from "./styles/Layout";
import GlobalStyles from "./styles/GlobalStyles";
import { useCityCoordinates } from "./services/useCityCoordinates";
import styled from "styled-components";

export const AppContainer = styled.main`
  width: 80rem;

  border: 10px solid #dcdcdc;
  border-radius: 50px;
  overflow: hidden;
  /* Adds a subtle inner shadow for a recessed look */

  /* Gradient border effect */
  /* background: linear-gradient(to bottom, #f0f0f0, #dcdcdc); */
  /* border-image: linear-gradient(to bottom, #ffffff, #dcdcdc) 1; */
`;

function App() {
  useCityCoordinates();
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
