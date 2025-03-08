import { useWeather } from "../../context/WeatherContext";
import { format } from "date-fns";
import {
  DailyForecastContainer,
  DailyForecastDay,
  ForecastItem,
  WeatherIcon,
} from "./Daily.styles";

const DailyForecast = () => {
  const { dailyForecast } = useWeather();

  return (
    <DailyForecastContainer>
      {dailyForecast?.map((day, index) => (
        <ForecastItem key={day.dt}>
          <DailyForecastDay>
            {index === 0
              ? "TODAY"
              : format(new Date(day.dt * 1000), "EEE").toUpperCase()}
          </DailyForecastDay>
          <WeatherIcon
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt={day.weather[0].description}
          />
          <span>{day.temp.night}°C</span>
          <span>
            <strong>{day.temp.day}°C</strong>
          </span>
        </ForecastItem>
      ))}
    </DailyForecastContainer>
  );
};

export default DailyForecast;
