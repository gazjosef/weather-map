// import React from "react";
import styled from "styled-components";
import { useWeatherData } from "../../services/useWeatherData";
import { format } from "date-fns";

// Types
interface HourlyWeather {
  dt: number;
  main: { temp: number };
  weather: { icon: string }[];
}

// interface WeatherForecastProps {
//   timezoneOffset: number; // Needed to adjust UTC time to local time
// }

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
  min-width: 5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.8rem;
`;

const WeatherIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const WeatherForecast = () => {
  const { forecast, forecastError } = useWeatherData();

  // Check if there is weather data and handle error
  if (forecastError) return <p>Forecast not found</p>;
  if (!forecast) return <p>Loading...</p>;

  // Get the first 5 hours from the forecast data
  const nextFiveHours = forecast.list.slice(0, 5); // forecast.list contains hourly forecast data

  return (
    <ForecastContainer>
      {forecastError && <p>Forecast not found</p>}
      {nextFiveHours.map((hourData: HourlyWeather) => {
        const localTime = new Date(hourData.dt * 1000);
        const formattedTime = format(localTime, "h a"); // Converts to 12-hour format
        const icon = hourData.weather[0].icon; // Assuming there's always at least one weather condition per hour
        const temp = Math.round(hourData.main.temp); // Accessing the temperature from main

        return (
          <ForecastItem key={hourData.dt}>
            <span>{formattedTime}</span>
            <WeatherIcon
              src={`https://openweathermap.org/img/wn/${icon}.png`}
              alt="weather"
            />
            <span>{temp}°C</span>
          </ForecastItem>
        );
      })}
    </ForecastContainer>
  );
};

export default WeatherForecast;
