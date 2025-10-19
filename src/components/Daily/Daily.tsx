import { useWeather } from "../../context/useWeather";
import { format } from "date-fns";
import {
  DailyForecastContainer,
  DailyForecastDay,
  ForecastItem,
} from "./Daily.styles";
import WeatherIcon from "../Icon/Icon"; // ✅ NEW import

const DailyForecast = () => {
  const { dailyForecast } = useWeather();

  return (
    <DailyForecastContainer>
      {dailyForecast?.map((day, index) => {
        const iconCode = day.weather[0].icon; // e.g. "10d"
        const description = day.weather[0].description;

        return (
          <ForecastItem key={day.dt}>
            <DailyForecastDay>
              {index === 0
                ? "TODAY"
                : format(new Date(day.dt * 1000), "EEE").toUpperCase()}
            </DailyForecastDay>

            {/* ✅ Use your local WeatherIcon instead of external URL */}
            <WeatherIcon iconCode={iconCode} alt={description} />

            <span>{Math.round(day.temp.night)}°C</span>
            <span>
              <strong>{Math.round(day.temp.day)}°C</strong>
            </span>
          </ForecastItem>
        );
      })}
    </DailyForecastContainer>
  );
};

export default DailyForecast;
