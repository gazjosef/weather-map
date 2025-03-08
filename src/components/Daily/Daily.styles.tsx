import styled from "styled-components";

export const DailyForecastContainer = styled.div`
  padding: 1rem;
  background-color: #222;
  border-radius: 8px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  color: white;
`;
export const DailyForecastDay = styled.span`
  width: 2.5rem;
  font-weight: bold;
`;

export const ForecastItem = styled.div`
  /* background: rgba(255, 255, 255, 0.1); */
  border-radius: 0.8rem;
  padding: 0 0.75rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WeatherIcon = styled.img`
  width: 40px;
  height: 40px;
`;
