import { useEffect } from "react";
import { useMap } from "react-leaflet";

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

export default MapUpdater;
