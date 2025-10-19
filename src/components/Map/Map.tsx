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
<<<<<<< HEAD
        {/* <ToggleButton /> */}
        <Info />
        <MapClickHandler />
        <MapUpdater center={coordinates} isCollapsed={isCollapsed} />
        {activeOverlay && <TileLayer url={weatherLayers[activeOverlay]} />}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={1}
        />

        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles by Humanitarian OpenStreetMap Team'
        /> */}

        <Marker position={coordinates}>
          <Popup>Selected Location</Popup>
        </Marker>
=======
        <MapContent coordinates={coordinates} activeOverlay={activeOverlay} />
>>>>>>> d3a8646bc53e4915b69c9d3b777d6f62b250bf24
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
