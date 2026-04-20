import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({ clothingItems = [], onCardClick, onAddItem }) {
  return (
    <div className="profile__content">
      <div className="profile__header">
        <h2 className="profile__title">Your items</h2>
        <button type="button" className="profile__add-btn" onClick={onAddItem}>
          + Add new
        </button>
      </div>

      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item.id || item._id}
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
