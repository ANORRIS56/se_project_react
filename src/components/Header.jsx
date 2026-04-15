import logo from "../images/wtwr.svg";
import avatar from "../images/Terrence.svg";
import ToggleSwitch from "./ToggleSwitch";

function Header({ onAddClick, weatherData }) {
  const date = new Date();
  const dateString = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR logo" className="header__logo" />
        <p className="header__date">
          {dateString}, {weatherData.city || "Loading..."}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        <button className="header__add-btn" type="button" onClick={onAddClick}>
          + Add clothes
        </button>

        <p className="header__username">Terrence Teggene</p>

        {/* ✅ THIS IS THE FIX */}
        <img src={avatar} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
