import { useState } from "react";
import { MapContainer } from "react-leaflet";
import type { MapContainerProps } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useWeather } from "../../context/useWeather";
import ToggleButton from "../Button/ToggleBtn";
import MapContent from "../Map/MapContent";
import OverlayControls from "./OverlayControls";

const WeatherMap = () => {
  const { coordinates } = useWeather();
  const [activeOverlay, setActiveOverlay] = useState<
    "rain" | "clouds" | "temp" | null
  >(null);

  console.log("Coordinates:", coordinates);

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer
        {...({
          center: coordinates,
          zoom: 13,
          style: {
            height: "100%",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
          },
        } as MapContainerProps)}
      >
        <MapContent coordinates={coordinates} activeOverlay={activeOverlay} />
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

export default WeatherMap;
