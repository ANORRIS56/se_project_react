import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function resetForm() {
    setValues(initialValues);
  }

  return { values, handleChange, resetForm };
}

export default useForm;
