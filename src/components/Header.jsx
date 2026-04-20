import { Link } from "react-router-dom";
import logo from "../images/wtwr.svg";
import avatar from "../images/terrence.svg";
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
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date">
          {dateString}, {weatherData.city || "Loading..."}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        <button className="header__add-btn" type="button" onClick={onAddClick}>
          + Add clothes
        </button>

        <Link to="/profile" className="header__profile-link">
          <p className="header__username">Terrence Teggene</p>
          <img src={avatar} alt="User avatar" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
