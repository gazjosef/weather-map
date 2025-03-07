import styled from "styled-components";

export const ForecastContainer = styled.div`
  background-color: #222;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  gap: 1rem;
  overflow-x: auto;

  color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0.4rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.8rem;
`;

export const WeatherIcon = styled.img`
  width: 40px;
  height: 40px;
`;
