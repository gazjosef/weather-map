import React, { useState, Dispatch, SetStateAction } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useWeather } from "../../context/WeatherContext";
import ToggleButton from "../Button/ToggleBtn";
import Info from "../Info/Info";
import MapClickHandler from "./MapClickHandler";
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
      "&animation=true",
    clouds:
      "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=" +
      import.meta.env.VITE_OPENWEATHER_API_KEY,
    temp:
      "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=" +
      import.meta.env.VITE_OPENWEATHER_API_KEY,
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer
        center={coordinates}
        zoom={10}
        style={{
          height: "100%",
          width: "100%",
          border: ".75rem solid rgba(220, 220, 220, 0.5)",
          borderRadius: "2rem",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* <ToggleButton /> */}
        <Info />
        <MapClickHandler />
        <MapUpdater center={coordinates} isCollapsed={isCollapsed} />
        {activeOverlay && <TileLayer url={weatherLayers[activeOverlay]} />}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={1}
        />

        <Marker position={coordinates}>
          <Popup>Selected Location</Popup>
        </Marker>
      </MapContainer>

      {/* Overlay Controls positioned outside the map container */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10000,
          background: "rgba(0,0,0,0.6)",
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid rgba(220, 220, 220, 0.5)",
          pointerEvents: "auto", // Make sure it receives mouse events
        }}
      >
        <OverlayControls
          setActiveOverlay={setActiveOverlay}
          activeOverlay={activeOverlay}
        />
      </div>

      {/* Render the toggle button outside MapContainer */}
      <div
        style={{
          position: "absolute",
          left: "2rem",
          top: "12rem",
          zIndex: 10000,
          pointerEvents: "auto",
        }}
      >
        <ToggleButton />
      </div>
    </div>
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
    <div>
      {[
        // { name: "Rain", key: "rain" as const },
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
