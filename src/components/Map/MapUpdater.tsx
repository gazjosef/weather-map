import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null; // ✅ This component only updates the map, nothing to render
};

export default MapUpdater;
