import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import {
  MapWrapper,
  // RadarToggleButton
} from "./Map.styles";

// import RainRadar from "../Layer/RainRadar";
import WeatherLayers from "../Layer/WeatherLayers";
import Sidebar from "../Sidebar/Sidebar";

type LayerTypes = "rain" | "clouds" | "temp" | "wind";

type LayersState = Record<LayerTypes, boolean>;
type OpacityState = Record<LayerTypes, number>;
const Map = () => {
  const [layers, setLayers] = useState<LayersState>({
    rain: false,
    clouds: false,
    temp: false,
    wind: false,
  });

  const [opacity, setOpacity] = useState<OpacityState>({
    rain: 0.6,
    clouds: 0.6,
    temp: 0.6,
    wind: 0.6,
  });
  // const [showRadar, setShowRadar] = useState(false);

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const updateOpacity = (layer: keyof typeof opacity, value: number) => {
    setOpacity((prev) => ({ ...prev, [layer]: value }));
  };

  return (
    <MapWrapper>
      <Sidebar
        layers={layers}
        opacity={opacity}
        toggleLayer={toggleLayer}
        updateOpacity={updateOpacity}
      />
      <MapContainer
        center={[-33.8688, 151.2093]}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
      >
        <WeatherLayers layers={layers} opacity={opacity} />
      </MapContainer>
      {/* <MapContainer
        center={[-33.8688, 151.2093]}
        zoom={10}
        style={{ width: "100vw", height: "100vh", background: "#ddd" }} // Ensure it has a visible background
      >
        <WeatherLayers layers={layers} opacity={opacity} />
      </MapContainer> */}
    </MapWrapper>
  );
};

export default Map;
