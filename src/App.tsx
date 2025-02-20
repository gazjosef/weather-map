import "./App.css";
import { CityProvider } from "./context/CityContext";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <CityProvider>
      <Sidebar />
      <Map />
    </CityProvider>
  );
}

export default App;
