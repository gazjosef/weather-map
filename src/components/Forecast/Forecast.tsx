import { useWeather } from "../../context/useWeather";
import { format } from "date-fns";
import { ForecastContainer, ForecastItem } from "./Forecast.styles";
import WeatherIcon from "../Icon/Icon"; // ✅ <-- NEW import

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
        const iconCode = hourData.weather[0].icon;
        const temp = Math.round(hourData.main.temp);

        return (
          <ForecastItem key={hourData.dt}>
            <span>{index === 0 ? "NOW" : formattedTime}</span>
            {/* ✅ Use your local SVG-based component instead */}
            <WeatherIcon
              iconCode={iconCode}
              alt={hourData.weather[0].description}
            />
            <span>{temp}°C</span>
          </ForecastItem>
        );
      })}
    </ForecastContainer>
  );
};

export default WeatherForecast;
