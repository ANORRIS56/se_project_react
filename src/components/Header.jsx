import { Link } from "react-router-dom";
import logo from "../images/wtwr.svg";
import ToggleSwitch from "./ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({
  onAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

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

        {isLoggedIn ? (
          <>
            <button
              className="header__add-btn"
              type="button"
              onClick={onAddClick}
            >
              + Add clothes
            </button>

            <Link to="/profile" className="header__profile-link">
              <p className="header__username">{currentUser?.name || "User"}</p>

              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User avatar"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name?.[0] || "U"}
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              className="header__auth-btn"
              type="button"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>

            <button
              className="header__auth-btn"
              type="button"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
