// src/components/WeatherIcon.tsx
import React from "react";
import styled from "styled-components";
import { weatherIconMap } from "../../utils/iconMaps";

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

type IconCode = keyof typeof weatherIconMap;

interface WeatherIconProps {
  iconCode: string;
  alt?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, alt }) => {
  const iconFile = weatherIconMap[iconCode as IconCode] ?? "not-available.svg";

  // ✅ Use `new URL()` so Vite resolves it correctly in production
  const iconPath = new URL(`../../assets/icons/${iconFile}`, import.meta.url)
    .href;

  return <Icon src={iconPath} alt={alt ?? "weather icon"} />;
};

export default WeatherIcon;
