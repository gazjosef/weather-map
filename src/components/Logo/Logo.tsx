import styled from "styled-components";
import logo from "../../../public/favicon_io/android-chrome-512x512.png";
import { Flex } from "../../styles/Layout";

// Styled image component
export const LogoImage = styled.img`
  width: 30px; // Adjust size as needed
  height: auto;
  display: block;
  margin: 0 auto;
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
