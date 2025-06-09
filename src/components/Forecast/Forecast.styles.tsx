import styled from "styled-components";

export const ForecastContainer = styled.div`
  background-color: #222;
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(220, 220, 220, 0.5);

  display: flex;
  gap: 0.75rem;
  overflow-x: auto;

  color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ForecastItem = styled.div`
  padding: 0.5rem;
  border-radius: 0.8rem;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const WeatherIcon = styled.img`
  width: 40px;
  height: 40px;
`;
