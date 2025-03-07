import { useWeather } from "../../context/WeatherContext";
import { FaChevronLeft, FaBars } from "react-icons/fa";
import { ToggleButton } from "./ToggleBtn.styles";

const ToggleBtn = () => {
  const { isCollapsed, toggleCollapsed } = useWeather();
  return (
    <ToggleButton onClick={() => toggleCollapsed()}>
      {isCollapsed ? <FaBars /> : <FaChevronLeft />}
    </ToggleButton>
  );
};
export default ToggleBtn;
