import "./App.css";
import { CityProvider } from "./context/CityContext";
import Map from "./components/Map/Map";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <CityProvider>
      <Sidebar />
      <Map />
    </CityProvider>
  );
}

export default App;
