import React from "react";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import type { TileLayerProps } from "react-leaflet";

import { useWeather } from "../../context/useWeather";
import Info from "../Info/Info";
import MapClickHandler from "./MapClickHandler";
import MapUpdater from "./MapUpdater";

interface Props {
  coordinates: [number, number];
  activeOverlay: "rain" | "clouds" | "temp" | null;
}

const WeatherMapContent: React.FC<Props> = ({ coordinates, activeOverlay }) => {
  const { isCollapsed } = useWeather();

  const weatherLayers: Record<"rain" | "clouds" | "temp", string> = {
    rain:
      "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=" +
      import.meta.env.VITE_OPENWEATHER_API_KEY +
      "&animation=true",
    clouds:
      "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=" +
      import.meta.env.VITE_OPENWEATHER_API_KEY,
    temp:
      "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=" +
      import.meta.env.VITE_OPENWEATHER_API_KEY,
  };

  return (
    <>
      <Info />
      <MapClickHandler />
      <MapUpdater center={coordinates} isCollapsed={isCollapsed} />

      {/* <TileLayer
        {...({
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          opacity: 1,
        } as TileLayerProps)}
      /> */}

      {/* <TileLayer
        {...({
          url: "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png",
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
          opacity: 1,
        } as TileLayerProps)}
      /> */}

      <TileLayer
        {...({
          url: `https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=${
            import.meta.env.VITE_MAPTILER_API_KEY
          }`,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>',
          opacity: 1,
        } as TileLayerProps)}
      />

      {activeOverlay && (
        <TileLayer
          {...({
            url: weatherLayers[activeOverlay],
            opacity: 0.7,
          } as TileLayerProps)}
        />
      )}

      <Marker position={coordinates as LatLngExpression}>
        <Popup>Selected Location</Popup>
      </Marker>
    </>
  );
};

export default WeatherMapContent;
