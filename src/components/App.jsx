import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Profile from "./Profile";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { coordinates, API_KEY, defaultWeatherData } from "../utils/constants";
import { fetchWeather } from "../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../utils/api";

function App() {
  const [items, setItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState(defaultWeatherData);

  const currentUser = {
    name: "Terrence Teggene",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  useEffect(() => {
    fetchWeather(coordinates, API_KEY)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Weather fetch failed:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Items fetch failed:", error);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) {
      return undefined;
    }

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
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

  function handleOpenDeleteModal(card) {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  }

  function handleAddItemSubmit(values, resetForm) {
    addItem(values)
      .then((newItem) => {
        setItems((prevItems) => [newItem, ...prevItems]);
        resetForm();
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Add item failed:", error);
      });
  }

  function handleDeleteCard() {
    if (!cardToDelete) {
      return;
    }

    deleteItem(cardToDelete.id)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== cardToDelete.id),
        );
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Delete item failed:", error);
      });
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
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  onAddClick={handleOpenAddModal}
                  weatherData={weatherData}
                />
                <Main
                  items={items}
                  onCardClick={handleCardClick}
                  weatherData={weatherData}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Header
                  onAddClick={handleOpenAddModal}
                  weatherData={weatherData}
                />
                <Profile
                  items={items}
                  currentUser={currentUser}
                  onCardClick={handleCardClick}
                  onAddItem={handleOpenAddModal}
                />
                <Footer />
              </>
            }
          />
        </Routes>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          onCloseModal={handleCloseModal}
        />

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          onDelete={handleOpenDeleteModal}
        />

        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={handleCloseModal}
          onConfirm={handleDeleteCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
