import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import styled from "styled-components";

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const center: LatLngExpression = [-33.8688, 151.2093]; // Explicit type for Leaflet coordinates

const Map = () => {
  return (
    <MapWrapper>
      <MapContainer
        center={center}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
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
