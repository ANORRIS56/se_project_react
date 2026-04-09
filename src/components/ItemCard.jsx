import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <button
        className="card__button"
        type="button"
        onClick={() => onCardClick(item)}
      >
        <span className="card__label">{item.name}</span>
        <div className="card__image-container">
          <img className="card__image" src={item.link} alt={item.name} />
        </div>
      </button>
    </li>
  );
}

export default ItemCard;
