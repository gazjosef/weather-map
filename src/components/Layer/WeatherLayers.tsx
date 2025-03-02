import { TileLayer } from "react-leaflet";

type WeatherLayersProps = {
  layers: Record<"rain" | "clouds" | "temp" | "wind", boolean>;
  opacity: Record<"rain" | "clouds" | "temp" | "wind", number>;
};

const WeatherLayers = ({ layers, opacity }: WeatherLayersProps) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  return (
    <>
      {layers.rain && (
        <TileLayer
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          attribution="&copy; OpenWeather"
          opacity={opacity.rain}
        />
      )}
      {layers.clouds && (
        <TileLayer
          url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          attribution="&copy; OpenWeather"
          opacity={opacity.clouds}
        />
      )}
      {layers.temp && (
        <TileLayer
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          attribution="&copy; OpenWeather"
          opacity={opacity.temp}
        />
      )}
      {layers.wind && (
        <TileLayer
          url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          attribution="&copy; OpenWeather"
          opacity={opacity.wind}
        />
      )}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
    </>
  );
};

export default WeatherLayers;
