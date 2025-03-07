import { useWeather } from "../../context/WeatherContext";
import { FaChevronLeft, FaBars } from "react-icons/fa";

const ToggleBtn = () => {
  const { isCollapsed, setIsCollapsed } = useWeather();

  // Logging values for debugging
  console.log("isCollapsed:", isCollapsed);
  console.log("setIsCollapsed:", setIsCollapsed);
  return (
    // <ToggleButton onClick={() => isPressed()}>
    // <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)}>
    //   <button>{isCollapsed ? <FaButton /> : <FaChevronLeft />}</button>
    // </ToggleButton>
    <button onClick={() => console.log("CLicked")}>
      {isCollapsed ? <FaBars /> : <FaChevronLeft />}
    </button>
  );
};
export default ToggleBtn;
