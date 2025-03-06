import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useWeather } from "../../context/WeatherContext";

interface MapUpdaterProps {
  center: [number, number]; // Ensure this type matches your coordinates
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center }) => {
  const { coordinates } = useWeather();

  const map = useMap();

  useEffect(() => {
    console.log("Updated coordinates:", coordinates);
    if (map) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center, map, coordinates]);

  return null; // ✅ This component only updates the map, nothing to render
};

export default MapUpdater;
