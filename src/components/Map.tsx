import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useCity } from "../context/CityContext";
// import { LatLngExpression } from "leaflet";
import styled from "styled-components";

const MapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  // width: 100%;
  width: calc(100vw - 250px); /* Adjust width to account for Sidebar */
  height: 100vh;
  background: red; /* TEMPORARY - Remove once confirmed */
`;

// const center: LatLngExpression = [-33.8688, 151.2093]; // Explicit type for Leaflet coordinates

const Map = () => {
  const { selectedCity } = useCity();

  console.log("Selected City:", selectedCity);
  return (
    <MapWrapper>
      <MapContainer
        center={
          selectedCity
            ? [selectedCity.lat, selectedCity.lon]
            : [-33.8688, 151.2093]
        }
        zoom={10}
        style={{ width: "100%", height: "100%", border: "5px solid blue" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
