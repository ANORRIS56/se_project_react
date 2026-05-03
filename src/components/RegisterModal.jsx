import { useState } from "react";
import ModalWithForm from "./ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, errorMessage }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    onRegister({
      name,
      avatar,
      email,
      password,
    });
  }

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonText="Sign Up"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="modal__input"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        required
      />

      <input
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        className="modal__input"
        value={avatar}
        onChange={(evt) => setAvatar(evt.target.value)}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="modal__input"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="modal__input"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
        required
      />

      {errorMessage && <p className="modal__error">{errorMessage}</p>}
    </ModalWithForm>
  );
}

export default RegisterModal;
