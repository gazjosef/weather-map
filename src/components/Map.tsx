import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useCity } from "../context/CityContext";
import styled from "styled-components";
import { useEffect } from "react";

const MapWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: calc(100vw - 150px); /* Adjust width to account for Sidebar */
  height: 100vh;
`;

const UpdateMapCenter = () => {
  const { selectedCity } = useCity();
  const map = useMap();

  useEffect(() => {
    if (selectedCity) {
      map.setView([selectedCity.lat, selectedCity.lon], 10);
    }
  }, [selectedCity, map]);

  return null;
};

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
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <UpdateMapCenter />
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
