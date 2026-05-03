import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

function AddItemModal({ isOpen, onAddItem, onCloseModal, errorMessage }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values, resetForm);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      handleSubmit={handleSubmit}
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      onClose={onCloseModal}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>

      {errorMessage && <p className="modal__error">{errorMessage}</p>}
    </ModalWithForm>
  );
}

export default AddItemModal;
