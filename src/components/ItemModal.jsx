import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/ItemModal.css";

function ItemModal({ card, isOpen, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) {
    return null;
  }

  const ownerId = typeof card.owner === "object" ? card.owner?._id : card.owner;

  const isOwn = ownerId === currentUser?._id;

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="modal__container modal__container_type_image">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_preview"
          onClick={onClose}
        >
          ✕
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div>
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isOwn && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={() => onDelete(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
