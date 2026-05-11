import { useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

function EditProfileModal({ isOpen, onClose, currentUser, onUpdateUser }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, setValues]);

  function handleSubmit() {
    onUpdateUser(values);
  }

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label className="modal__label">
        Name *
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar *
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
