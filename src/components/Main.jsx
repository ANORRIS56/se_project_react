import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

function Main({ items, onCardClick }) {
  return (
    <main className="main">
      <div className="main__content">
        <WeatherCard />
        <p className="main__text">Today is 75°F / You may want to wear:</p>
        <ul className="main__cards">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Main;
