import styled from "styled-components";

export const SidebarWrapper = styled.div<{ $collapsed: boolean }>`
  position: absolute;
  left: ${({ $collapsed }) => ($collapsed ? "-250px" : "0")};
  top: 0;
  height: 100vh;
  width: 250px;
  background: white;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow-y: auto; // In case content overflows
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: -40px;
  top: 20px;
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const LayerControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;
  }
`;

export const OpacitySlider = styled.input`
  width: 80px;
  cursor: pointer;
  accent-color: #007bff;
`;
