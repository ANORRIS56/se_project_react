import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose }) {
  if (!card) return null;

  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_type_image">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_preview"
          onClick={onClose}
        >
          ✕
        </button>

        <img src={card.link} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
