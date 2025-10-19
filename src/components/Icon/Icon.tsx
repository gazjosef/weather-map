// src/components/WeatherIcon.tsx
import React from "react";
import styled from "styled-components";
import { weatherIconMap } from "../../utils/iconMaps";

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

// Define the valid keys from your icon map
type IconCode = keyof typeof weatherIconMap;

// Props type
interface WeatherIconProps {
  iconCode: string;
  alt?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, alt }) => {
  // Use type narrowing to ensure safe lookup
  const iconFile = weatherIconMap[iconCode as IconCode] ?? "not-available.svg";

  // Adjust path depending on your setup
  const iconPath = `/src/assets/icons/${iconFile}`;

  return <Icon src={iconPath} alt={alt ?? "weather icon"} />;
};

export default WeatherIcon;
