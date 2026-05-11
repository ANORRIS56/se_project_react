import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  errorMessage,
  onRegisterClick,
}) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit() {
    onLogin(values);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      title="Log In"
      buttonText="Log In"
      name="login"
      secondaryButtonText="or Sign Up"
      onSecondaryButtonClick={onRegisterClick}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>

      {errorMessage && <p className="modal__error">{errorMessage}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
