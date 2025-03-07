import styled from "styled-components";
import { useWeather } from "../../context/WeatherContext";
import { format } from "date-fns";

// Styled Components
const DailyForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #222;
  border-radius: 8px;
  color: white;
`;

const ForecastItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.8rem;
`;

const WeatherIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const DailyForecast = () => {
  const { dailyForecast } = useWeather();

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
