import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useWeather } from "../../context/WeatherContext";

interface MapUpdaterProps {
  center: [number, number];
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center }) => {
  const { coordinates } = useWeather();

  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center, map, coordinates]);

  return null;
};

export default MapUpdater;
