import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import "./blocks/App.css";
import "./blocks/Footer.css";
import "./blocks/Header.css";
import "./blocks/ItemCard.css";
import "./blocks/ItemModal.css";
import "./blocks/Main.css";
import "./blocks/ModalWithForm.css";
import "./blocks/ToggleSwitch.css";
import "./blocks/WeatherCard.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
