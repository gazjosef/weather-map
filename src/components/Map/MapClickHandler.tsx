import { useMapEvents } from "react-leaflet";
import { useWeather } from "../../context/useWeather";

const MapClickHandler = () => {
  const { setCoordinates } = useWeather(); // Update global coordinates

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log("Clicked at:", lat, lng);
      setCoordinates([lat, lng]); // Update context state
    },
  });

  return null; // This component does not render anything
};

export default MapClickHandler;
