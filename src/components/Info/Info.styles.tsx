import styled from "styled-components";

export const InfoBox = styled.div`
  background: rgba(0, 0, 0, 0.7);
  min-width: 15rem;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid rgba(220, 220, 220, 0.5);

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  flex-direction: column;
  display: flex;
  align-items: center;

  color: white;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
`;

export const InfoTitle = styled.h2`
  font-size: 2rem;
`;

export const InfoTemp = styled.h1`
  font-size: 3rem;
`;

export const InfoDescription = styled.div`
  font-size: 1.6rem;
  text-align: center;
`;
