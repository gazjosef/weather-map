import styled from "styled-components";

// export const ToggleButton = styled.button`
export const ToggleButton = styled.button`
  cursor: pointer;
  height: 4rem;
  width: 4rem;
  background-color: #444;
  /* background-color: orangered; */
  border: none;
  border-radius: 50%;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  position: absolute;
  left: 2rem;
  top: 12rem;
  transition: right 0.3s ease-in-out;
  z-index: 9999;
  transform: translateY(-50%);

  &:hover {
    background-color: #555;
  }
`;
