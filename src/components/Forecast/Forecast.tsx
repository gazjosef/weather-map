import { useWeather } from "../../context/WeatherContext";
import { format } from "date-fns";
import { ForecastContainer, ForecastItem } from "./Forecast.styles";
import WeatherIcon from "../Icon/Icon"; // ✅ <-- NEW import

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
  rain?: Rain; // optional because it may not always exist
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

  if (!hourlyForecast) {
    return <p>Loading...</p>;
  }

  const nextFiveHours = hourlyForecast.list.slice(0, 5);

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
