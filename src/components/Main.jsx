import { useContext } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function Main({ items, onCardClick, weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = items.filter(
    (item) => item.weather === weatherData.condition,
  );

  return (
    <main className="main">
      <div className="main__content">
        <WeatherCard weatherData={weatherData} />

        <p className="main__text">
          Today is {weatherData.temperature[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="main__cards">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Main;
