import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import "../blocks/ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle">
      <input
        className="toggle__checkbox"
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle__slider"></span>
      <span
        className={`toggle__label toggle__label_type_f ${
          currentTemperatureUnit === "F" ? "toggle__label_active" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle__label toggle__label_type_c ${
          currentTemperatureUnit === "C" ? "toggle__label_active" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
