import { useWeather } from "../../context/useWeather";
import { FaChevronLeft, FaBars } from "react-icons/fa";
import { ToggleButton } from "./ToggleBtn.styles";

const ToggleBtn = () => {
  const { isCollapsed, toggleCollapsed } = useWeather();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // React synthetic event
    e.nativeEvent.stopImmediatePropagation(); // Leaflet native event fix
    toggleCollapsed();
    console.log("working");
  };

  return (
    <div>
      <ToggleButton onClick={handleClick}>
        {isCollapsed ? <FaBars /> : <FaChevronLeft />}
      </ToggleButton>
    </div>
  );
};
export default ToggleBtn;
