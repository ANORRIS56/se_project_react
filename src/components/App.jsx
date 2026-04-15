import { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { defaultClothingItems } from "../utils/clothingItems";
import { coordinates, API_KEY, defaultWeatherData } from "../utils/constants";
import { fetchWeather } from "../utils/weatherApi";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState(defaultWeatherData);

  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  useEffect(() => {
    fetchWeather(coordinates, API_KEY)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeModal]);

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  function handleOpenAddModal() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      _id: Date.now().toString(),
      name: formValues.name,
      link: formValues.imageUrl,
      weather: formValues.weather,
    };

    setClothingItems((prev) => [newItem, ...prev]);

    setFormValues({
      name: "",
      imageUrl: "",
      weather: "hot",
    });

    handleCloseModal();
  }

  const contextValue = useMemo(
    () => ({
      currentTemperatureUnit,
      handleToggleSwitchChange,
    }),
    [currentTemperatureUnit],
  );

  return (
    <CurrentTemperatureUnitContext.Provider value={contextValue}>
      <div className="page">
        <Header onAddClick={handleOpenAddModal} weatherData={weatherData} />

        <Main
          items={clothingItems}
          onCardClick={handleCardClick}
          weatherData={weatherData}
        />

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
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="modal__label">
            Image URL
            <input
              className="modal__input"
              type="url"
              name="imageUrl"
              value={formValues.imageUrl}
              onChange={handleInputChange}
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
                checked={formValues.weather === "hot"}
                onChange={handleInputChange}
              />
              Hot
            </label>

            <label className="modal__radio-label">
              <input
                type="radio"
                name="weather"
                value="warm"
                checked={formValues.weather === "warm"}
                onChange={handleInputChange}
              />
              Warm
            </label>

            <label className="modal__radio-label">
              <input
                type="radio"
                name="weather"
                value="cold"
                checked={formValues.weather === "cold"}
                onChange={handleInputChange}
              />
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
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
