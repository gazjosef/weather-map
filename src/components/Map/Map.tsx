import React, { useState, Dispatch, SetStateAction } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useWeather } from "../../context/WeatherContext";
import ToggleButton from "../Button/ToggleBtn";
import Info from "../Info/Info";
import MapUpdater from "./MapUpdater";

const WeatherMap = () => {
  const { coordinates, isCollapsed } = useWeather();
  const [activeOverlay, setActiveOverlay] = useState<
    "rain" | "clouds" | "temp" | null
  >(null);

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
    // <MapWrapper>
    <MapContainer
      center={coordinates}
      zoom={10}
      style={{
        height: "100%",
        width: "100%",
        border: "1rem solid #dcdcdc",
        borderRadius: "2rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ToggleButton />
      <Info />
      <MapUpdater center={coordinates} isCollapsed={isCollapsed} />
      {activeOverlay && <TileLayer url={weatherLayers[activeOverlay]} />}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" /> */}
      <Marker position={coordinates}>
        <Popup>Selected Location</Popup>
      </Marker>
      <OverlayControls
        setActiveOverlay={setActiveOverlay}
        activeOverlay={activeOverlay}
      />
    </MapContainer>
    // </MapWrapper>
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

export default WeatherMap;
