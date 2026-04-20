import avatar from "../images/terrence.svg";
import ItemCard from "./ItemCard";

function Profile({ items, onCardClick, onAddClick }) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <img src={avatar} alt="Avatar" className="profile__avatar" />
        <p className="profile__name">Terrence Teggene</p>
      </div>

      <div className="profile__content">
        <div className="profile__header">
          <h2 className="profile__title">Your items</h2>
          <button
            type="button"
            className="profile__add-btn"
            onClick={onAddClick}
          >
            + Add new
          </button>
        </div>

        <ul className="cards__list">
          {items.map((item) => (
            <ItemCard
              key={item.id || item._id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
