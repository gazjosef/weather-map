import { useWeather } from "../../context/WeatherContext";
import { FaChevronLeft, FaBars } from "react-icons/fa";
import { ToggleButton } from "./ToggleBtn.styles";

const ToggleBtn = () => {
  const { isCollapsed, toggleCollapsed } = useWeather();

  // Logging values for debugging
  console.log("isCollapsed:", isCollapsed);
  return (
    // <ToggleButton onClick={() => isPressed()}>
    <ToggleButton onClick={() => toggleCollapsed()}>
      <button>{isCollapsed ? <FaBars /> : <FaChevronLeft />}</button>
    </ToggleButton>
    // <button onClick={() => console.log("CLicked")}>
    //   {isCollapsed ? <FaBars /> : <FaChevronLeft />}
    // </button>
  );
};
export default ToggleBtn;
