import styled from "styled-components";

export const MapWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: calc(100vw - 150px); /* Adjust width to account for Sidebar */
  height: 100vh;
`;

export const RadarToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s ease;
  z-index: 1000;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;
