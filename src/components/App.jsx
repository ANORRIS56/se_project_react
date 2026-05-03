import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Profile from "./Profile";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { coordinates, API_KEY, defaultWeatherData } from "../utils/constants";
import { fetchWeather } from "../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../utils/api";
import { authorize, register, getCurrentUser } from "../utils/auth";

function App() {
  const [items, setItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchWeather(coordinates, API_KEY)
      .then(setWeatherData)
      .catch((err) => console.error("Weather error:", err));
  }, []);

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch((err) => console.error("Items error:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    function handleEsc(evt) {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeModal]);

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  function handleOpenAddModal() {
    setErrorMessage("");
    setActiveModal("add-garment");
  }

  function handleOpenLoginModal() {
    setErrorMessage("");
    setActiveModal("login");
  }

  function handleOpenRegisterModal() {
    setErrorMessage("");
    setActiveModal("register");
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
    setErrorMessage("");
  }

  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getCurrentUser(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setErrorMessage("");
        handleCloseModal();
        window.history.replaceState({}, document.title, "/");
      })
      .catch(() => {
        setErrorMessage("Invalid email or password");
      });
  }

  function handleRegister(values) {
    register(values)
      .then(() =>
        authorize({
          email: values.email,
          password: values.password,
        }),
      )
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getCurrentUser(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setErrorMessage("");
        handleCloseModal();
        window.history.replaceState({}, document.title, "/");
      })
      .catch((err) => {
        console.error("Register failed:", err);

        if (String(err).includes("409")) {
          setErrorMessage("Email already exists");
        } else {
          setErrorMessage(
            "Registration failed. Please check your information.",
          );
        }
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  function handleAddItemSubmit(values, resetForm) {
    addItem(values)
      .then((newItem) => {
        setItems((prev) => [newItem, ...prev]);
        setErrorMessage("");
        resetForm();
        handleCloseModal();
      })
      .catch(() => {
        setErrorMessage("Failed to add item. Please try again.");
      });
  }

  function handleDeleteCard() {
    if (!cardToDelete) return;

    deleteItem(cardToDelete._id)
      .then(() => {
        setItems((prev) =>
          prev.filter((item) => item._id !== cardToDelete._id),
        );
        handleCloseModal();
      })
      .catch((err) => console.error("Delete item failed:", err));
  }

  const tempContext = useMemo(
    () => ({
      currentTemperatureUnit,
      handleToggleSwitchChange,
    }),
    [currentTemperatureUnit],
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={tempContext}>
        <div className="page">
          <Header
            onAddClick={handleOpenAddModal}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            onLoginClick={handleOpenLoginModal}
            onRegisterClick={handleOpenRegisterModal}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  items={items}
                  onCardClick={handleCardClick}
                  weatherData={weatherData}
                />
              }
            />

            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <Profile
                    items={items}
                    currentUser={currentUser}
                    onCardClick={handleCardClick}
                    onAddItem={handleOpenAddModal}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={handleCloseModal}
            errorMessage={errorMessage}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            errorMessage={errorMessage}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
            errorMessage={errorMessage}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
