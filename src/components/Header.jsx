import logo from "../images/wtwr.svg";

function Header({ onAddClick }) {
  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR logo" className="header__logo" />
        <p className="header__date">June 15, New York</p>
      </div>

      <div className="header__right">
        <button className="header__add-btn" type="button" onClick={onAddClick}>
          + Add clothes
        </button>
        <p className="header__username">Terrence Teggene</p>
        <div className="header__avatar">T</div>
      </div>
    </header>
  );
}

export default Header;
