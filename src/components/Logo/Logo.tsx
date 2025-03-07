import styled from "styled-components";
import logo from "../../../public/favicon_io/android-chrome-512x512.png";
import { Flex } from "../../styles/Layout";

// Styled image component
export const LogoImage = styled.img`
  width: 25px; // Adjust size as needed
  height: auto;
  display: block;
  margin: 0 auto;
`;

export const LogoTitle = styled.h1`
  font-size: 2.5rem;
`;

const Logo = () => {
  return (
    <Flex alignItems="center" justifyContent="center" gap="1rem">
      <LogoImage src={logo} alt="App Logo" />
      <h1>WEATHER MAP</h1>
    </Flex>
  );
};
export default Logo;
