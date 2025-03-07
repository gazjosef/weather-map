import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useWeather } from "../../context/WeatherContext";

interface MapUpdaterProps {
  center: [number, number];
  isCollapsed: boolean;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center, isCollapsed }) => {
  const { coordinates } = useWeather();

  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center, map, coordinates]);

  // ✅ Add effect to resize map when sidebar collapses
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 300); // Match sidebar transition duration
    }
  }, [isCollapsed, map]);

  return null;
};

export default MapUpdater;
