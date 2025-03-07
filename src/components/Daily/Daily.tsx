import { useWeather } from "../../context/WeatherContext";
import { format } from "date-fns";
import {
  DailyForecastContainer,
  ForecastItem,
  WeatherIcon,
} from "./Daily.styles";

const DailyForecast = () => {
  const { dailyForecast } = useWeather();

  console.log("DAILY: ", dailyForecast);

  return (
    <DailyForecastContainer>
      {dailyForecast?.map((day) => (
        <ForecastItem key={day.dt}>
          <span>{format(new Date(day.dt * 1000), "EEEE")}</span>
          <WeatherIcon
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt={day.weather[0].description}
          />
          <span>{day.temp.day}°C</span>
          <span>
            ({day.temp.night}° / {day.temp.day}°)
          </span>
        </ForecastItem>
      ))}
    </DailyForecastContainer>
  );
};

export default DailyForecast;
