import logo from "../../assets/android-chrome-512x512.png";
import { LogoImage, LogoTitle } from "./Logo.styles";
import { Flex } from "../../styles/Layout";

const Logo = () => {
  return (
    <Flex alignItems="center" justifyContent="center" gap="1rem">
      <LogoImage src={logo} alt="App Logo" />
      <LogoTitle>WEATHER MAP</LogoTitle>
    </Flex>
  );
};
export default Logo;
