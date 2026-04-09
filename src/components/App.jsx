import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { defaultClothingItems } from "../utils/clothingItems";
import "./App.css";

function App() {
  const [clothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  function handleOpenAddModal() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleCloseModal();
  }

  return (
    <div className="page">
      <Header onAddClick={handleOpenAddModal} />
      <Main items={clothingItems} onCardClick={handleCardClick} />
      <Footer />

      <ModalWithForm
        isOpen={activeModal === "add-garment"}
        handleSubmit={handleSubmit}
        title="New garment"
        buttonText="Add garment"
        name="add-garment"
        onClose={handleCloseModal}
      >
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Name"
          />
        </label>

        <label className="modal__label">
          Image URL
          <input
            className="modal__input"
            type="url"
            name="imageUrl"
            placeholder="Image URL"
          />
        </label>

        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>

          <label className="modal__radio-label">
            <input type="radio" name="weather" />
            Hot
          </label>

          <label className="modal__radio-label">
            <input type="radio" name="weather" />
            Warm
          </label>

          <label className="modal__radio-label">
            <input type="radio" name="weather" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
