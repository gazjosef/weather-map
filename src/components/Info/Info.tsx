import styled from "styled-components";
// import { useWeatherData } from "../../services/useWeatherData";
// import { useWeather } from "../../context/WeatherContext";
import { useSearch } from "../../hooks/useSearch";
import { FlexColumn } from "../../styles/Layout";

const InfoTitle = styled.h2`
  font-size: 2rem;
`;

// const InfoTemp = styled.h1`
//   font-size: 4rem;
// `;

// const InfoDescription = styled.div`
//   font-size: 1.6rem;
//   text-align: center;
// `;

const Info = () => {
  // const { unit } = useWeather();
  const { city, countryCode } = useSearch();
  // const { currentWeather, city } = useWeatherData();

  // console.log("currentWeather", currentWeather);
  return (
    <FlexColumn alignItems="center" gap="2rem">
      {city && <p>City not found</p>}

      {city && (
        <>
          <InfoTitle>
            {city}, {countryCode}
          </InfoTitle>

          {/* <InfoTemp>
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
          </InfoDescription> */}
        </>
      )}
    </FlexColumn>
  );
};
export default Info;
