function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
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
      <div className="modal__container modal__container_type_delete">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={onClose}
        >
          ✕
        </button>

        <p className="modal__delete-text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>

        <button
          type="button"
          className="modal__delete-confirm-btn"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>

        <button
          type="button"
          className="modal__delete-cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
