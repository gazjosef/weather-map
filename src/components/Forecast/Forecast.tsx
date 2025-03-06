// import React from "react";
import styled from "styled-components";
// import { useWeatherData } from "../../services/useWeatherData";
import { useWeather } from "../../context/WeatherContext";

import { format } from "date-fns";

// Types
// interface HourlyWeather {
//   dt: number;
//   dt_txt: string; // ✅ Matches API data
//   main: { temp: number };
//   weather: { icon: string }[];
//   wind: { speed: number };
// }

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

// const dailyForecast = forecast.list.filter((entry) =>
//   entry.dt_txt.includes("12:00:00")
// );

// interface hourData {

// }
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  "3h": number;
}
interface HourlyForecastItem {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: { all: number };
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: { pod: string };
  dt_txt: string;
}

interface HourlyForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: HourlyForecastItem[];
}

const WeatherForecast = () => {
  const { hourlyForecast } = useWeather() as {
    hourlyForecast: HourlyForecastResponse | null;
  };

  // Check if hourlyForecast is available
  if (!hourlyForecast) {
    return <p>Loading...</p>; // Or display an error message
  }
  // Check if there is weather data and handle error
  //   if (forecastError) return <p>Forecast not found</p>;
  //   if (!forecast) return <p>Loading...</p>;

  // Get the first 5 hours from the forecast data
  const nextFiveHours = hourlyForecast.list.slice(0, 5); // forecast.list contains hourly forecast data

  console.log("hourlyForecast Data:", hourlyForecast);
  console.log("nextFiveHours Data:", nextFiveHours);
  return (
    <ForecastContainer>
      {nextFiveHours.map((hourData) => {
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
