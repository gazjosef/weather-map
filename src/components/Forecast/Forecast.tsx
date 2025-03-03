import React from "react";
import styled from "styled-components";
import { useWeatherData } from "../../services/useWeatherData";
import { format } from "date-fns";

// Types
interface HourlyWeather {
  dt: number;
  temp: number;
  icon: string;
}

interface WeatherForecastProps {
  hourlyData: HourlyWeather[];
  timezoneOffset: number; // Needed to adjust UTC time to local time
}

// Styled Components
const ForecastContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem;
  background-color: #222;
  border-radius: 8px;
  color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const WeatherIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  hourlyData,
  timezoneOffset,
}) => {
  const { data, error } = useWeatherData();

  // Check if there is weather data and handle error
  if (error) return <p>Forecast not found</p>;
  if (!data) return <p>Loading...</p>;

  const localTime = new Date((data.dt + timezoneOffset) * 1000);
  const formattedTime = format(localTime, "h a"); // Converts to 12-hour format
  return (
    <ForecastContainer>
      {error && <p>Forecast not found</p>}
      {hourlyData.map(({ dt, temp, icon }) => {
        return (
          <ForecastItem key={dt}>
            <span>{formattedTime}</span>
            <WeatherIcon
              src={`https://openweathermap.org/img/wn/${icon}.png`}
              alt="weather"
            />
            <span>{Math.round(temp)}°C</span>
          </ForecastItem>
        );
      })}
    </ForecastContainer>
  );
};

export default WeatherForecast;
