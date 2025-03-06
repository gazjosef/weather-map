import { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  // useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { useWeather } from "../../context/WeatherContext";
// import MapUpdater from "./MapUpdater";
import { ToggleButton } from "../Button/ToggleBtn";
import { useSearch } from "../../hooks/useSearch";

const WeatherMap = () => {
  const { coordinates } = useSearch();
  const [activeOverlay, setActiveOverlay] = useState<
    "rain" | "clouds" | "temp" | null
  >(null);
  // const [opacity, setOpacity] = useState(0.7);
  console.log("Current Coordinates:", coordinates);

  const weatherLayers: Record<"rain" | "clouds" | "temp", string> = {
    rain:
      "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=" +
      import.meta.env.VITE_OPENWEATHER_API_KEY +
      "&palette=greyscale",
    clouds:
      "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=" +
      import.meta.env.VITE_OPENWEATHER_API_KEY +
      "&palette=greyscale",
    temp:
      "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=" +
      import.meta.env.VITE_OPENWEATHER_API_KEY +
      "&palette=greyscale",
  };

  return (
    <MapContainer
      center={coordinates}
      zoom={12}
      style={{
        height: "auto",
        width: "100%",
        border: "10px solid #dcdcdc",
        borderRadius: "50px",
      }}
    >
      <MapUpdater center={coordinates} />

      <ToggleButton style={{ pointerEvents: "auto" }} />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" /> */}

      {activeOverlay && <TileLayer url={weatherLayers[activeOverlay]} />}

      <Marker position={coordinates}>
        <Popup>Selected Location</Popup>
      </Marker>

      <OverlayControls
        setActiveOverlay={setActiveOverlay}
        activeOverlay={activeOverlay}
      />
    </MapContainer>
  );
};

interface OverlayControlsProps {
  setActiveOverlay: Dispatch<SetStateAction<"rain" | "clouds" | "temp" | null>>;
  activeOverlay: "rain" | "clouds" | "temp" | null;
}

const OverlayControls: React.FC<OverlayControlsProps> = ({
  setActiveOverlay,
  activeOverlay,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        background: "rgba(0,0,0,0.6)",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      {[
        { name: "Rain", key: "rain" as const },
        { name: "Clouds", key: "clouds" as const },
        { name: "Temperature", key: "temp" as const },
      ].map(({ name, key }) => (
        <button
          key={key}
          onClick={() => setActiveOverlay(activeOverlay === key ? null : key)}
          style={{
            background: activeOverlay === key ? "#3498db" : "#2c3e50",
            color: "white",
            border: "none",
            margin: "5px",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
interface MapUpdaterProps {
  center: [number, number]; // Ensure this type matches your coordinates
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center, map]);

  return null; // ✅ This component only updates the map, nothing to render
};

export default WeatherMap;
