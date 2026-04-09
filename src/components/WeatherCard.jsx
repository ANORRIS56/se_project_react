import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather">
      <p className="weather__temp">75°F</p>

      <div className="weather__art">
        <div className="weather__sun"></div>
        <div className="weather__cloud weather__cloud_big"></div>
        <div className="weather__cloud weather__cloud_small"></div>
      </div>
    </section>
  );
}

export default WeatherCard;
