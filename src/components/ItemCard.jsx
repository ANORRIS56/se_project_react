import { useState } from "react";

import "../blocks/ItemCard.css";

import heart from "../images/heart.svg";
import heartLiked from "../images/heart-liked.svg";

function ItemCard({ item, onCardClick }) {
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    setIsLiked(!isLiked);
  }

  return (
    <li className="item-card">
      <div className="item-card__header">
        <p className="item-card__name" onClick={() => onCardClick(item)}>
          {item.name}
        </p>

        <button
          type="button"
          className="item-card__like-button"
          onClick={handleLike}
        >
          <img
            src={isLiked ? heartLiked : heart}
            alt="like button"
            className="item-card__like-icon"
          />
        </button>
      </div>

      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;
