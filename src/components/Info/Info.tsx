import { useWeatherData } from "../../services/useWeatherData";
import { useWeather } from "../../context/WeatherContext";
import styled from "styled-components";
import { FlexColumn } from "../../styles/Layout";

const InfoTitle = styled.h2`
  font-size: 2rem;
`;

const InfoTemp = styled.h1`
  font-size: 4rem;
`;

const InfoDescription = styled.div`
  font-size: 1.6rem;
  text-align: center;
`;

const Info = () => {
  const { unit } = useWeather();

  const { currentWeather, currentError } = useWeatherData();

  return (
    <FlexColumn alignItems="center" gap="2rem">
      {currentError && <p>City not found</p>}

      {currentWeather && (
        <>
          <InfoTitle>{currentWeather.name}</InfoTitle>

          <InfoTemp>
            {currentWeather.main.temp.toFixed(1)}°
            {unit === "metric" ? "C" : "F"}
          </InfoTemp>

          <InfoDescription>
            <p>{currentWeather.weather[0].description}</p>
            <p>
              Feels like{" "}
              <strong>
                {currentWeather.main.feels_like.toFixed(1)}°
                {unit === "metric" ? "C" : "F"}
              </strong>
            </p>
          </InfoDescription>
        </>
      )}
    </FlexColumn>
  );
};
export default Info;
