// import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  //   useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useWeather } from "../../context/WeatherContext";
import MapUpdater from "./MapUpdater";

const WeatherMap = () => {
  const { coordinates, setCoordinates } = useWeather();

  console.log("setCoordinates", setCoordinates);

  return (
    <MapContainer
      center={coordinates}
      zoom={10}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={coordinates}>
        <Popup>Selected Location</Popup>
      </Marker>

      <MapUpdater center={coordinates} />
      {/* <MapClickHandler setCoordinates={setCoordinates} /> */}
    </MapContainer>
  );
};

// const MapClickHandler = ({
//   setCoordinates,
// }: {
//   setCoordinates: (coords: [number, number]) => void;
// }) => {
//   useMapEvents({
//     click(e) {
//       setCoordinates([e.latlng.lat, e.latlng.lng]); // Update on map click
//     },
//   });

//   return null;
// };

export default WeatherMap;
