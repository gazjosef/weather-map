import { useWeather } from "../../context/WeatherContext";
import { FlexColumn } from "../../styles/Layout";
import { InfoBox, InfoDescription, InfoTemp, InfoTitle } from "./Info.styles";

const Info = () => {
  const { currentWeather } = useWeather();
  console.log("INFO: ", currentWeather);

  return (
    <InfoBox>
      <FlexColumn alignItems="center" gap=".5rem">
        {currentWeather && (
          <>
            <InfoTitle>
              {currentWeather.name}, {currentWeather.sys.country}
            </InfoTitle>

            <InfoTemp>
              {currentWeather.main.temp.toFixed(1)}°
              {/* {unit === "metric" ? "C" : "F"} */}
            </InfoTemp>

            <InfoDescription>
              <p>{currentWeather.weather[0].description}</p>
              <p>
                Feels like{" "}
                <strong>
                  {currentWeather.main.feels_like.toFixed(1)}°
                  {/* {unit === "metric" ? "C" : "F"} */}
                </strong>
              </p>
            </InfoDescription>
          </>
        )}
      </FlexColumn>
    </InfoBox>
  );
};
export default Info;
