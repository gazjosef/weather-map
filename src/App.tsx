import "./App.css";
import { CityProvider } from "./context/CityContext";
import Map from "./components/Map/Map";

function App() {
  return (
    <CityProvider>
      <Map />
    </CityProvider>
  );
}

export default App;
