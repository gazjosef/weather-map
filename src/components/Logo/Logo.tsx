import styled from "styled-components";
import logo from "../../assets/android-chrome-512x512.png";
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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Logo = () => {
  return (
    <Flex alignItems="center" justifyContent="center" gap="1rem">
      <LogoImage src={logo} alt="App Logo" />
      <LogoTitle>WEATHER MAP</LogoTitle>
    </Flex>
  );
};
export default Logo;
