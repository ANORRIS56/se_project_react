function ModalWithForm({
  isOpen,
  children,
  handleSubmit,
  title,
  buttonText,
  name,
  onClose,
  secondaryButtonText,
  onSecondaryButtonClick,
}) {
  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    handleSubmit();
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="modal__container modal__container_type_form">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="modal__title">{title}</h2>

        <form name={name} className="modal__form" onSubmit={onFormSubmit}>
          {children}

          <div className="modal__button-row">
            <button type="submit" className="modal__submit-btn">
              {buttonText}
            </button>

            {secondaryButtonText && (
              <button
                type="button"
                className="modal__switch-btn"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
