import "../blocks/ItemModal.css";

function ItemModal({ card, isOpen, onClose, onDelete }) {
  if (!card) {
    return null;
  }

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

          <button
            type="button"
            className="modal__delete-btn"
            onClick={() => onDelete(card)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
