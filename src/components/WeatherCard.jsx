import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather">
      <p className="weather__temp">
        {weatherData.temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit}
      </p>
      <div className="weather__art">
        <div className="weather__sun"></div>
        <div className="weather__cloud weather__cloud_big"></div>
        <div className="weather__cloud weather__cloud_small"></div>
      </div>
    </section>
  );
}

export default WeatherCard;
