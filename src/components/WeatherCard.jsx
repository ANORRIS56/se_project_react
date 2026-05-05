import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import weatherCard from "../images/weathercard.svg";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section
      className="weather"
      style={{ backgroundImage: `url(${weatherCard})` }}
    >
      <p className="weather__temp">
        {weatherData.temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
