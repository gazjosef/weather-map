import { useWeather } from "../../context/useWeather";
import { format } from "date-fns";
import {
  ForecastContainer,
  ForecastItem,
  WeatherIcon,
} from "./Forecast.styles";

import type { ForecastItem as ForecastItemType } from "../../types/weather";

const WeatherForecast = () => {
  const { hourlyForecast } = useWeather() as {
    hourlyForecast: ForecastItemType[] | null;
  };

  if (!hourlyForecast) {
    return <p>Loading...</p>;
  }

  const nextFiveHours = hourlyForecast.slice(0, 5);

  return (
    <ForecastContainer>
      {nextFiveHours.map((hourData, index) => {
        const localTime = new Date(hourData.dt * 1000);
        const formattedTime = format(localTime, "h a");
        const icon = hourData.weather[0].icon; // Assuming there's always at least one weather condition per hour
        const temp = Math.round(hourData.main.temp);

        return (
          <ForecastItem key={hourData.dt}>
            <span>{index === 0 ? "NOW" : formattedTime}</span>
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
