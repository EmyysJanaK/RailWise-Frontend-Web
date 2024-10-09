// FormValuesContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const FormValuesContext = createContext();

// Create a provider component
export const FormValuesProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    changesMade: false,
  });

  const handleInputChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
      changesMade: true,
    }));
  };

  const resetFormValues = () => {
    setFormValues((prev) => ({
      ...prev,
      oldPassword: "",
      newPassword: "",
    }));
  };

  return (
    <FormValuesContext.Provider value={{ formValues, handleInputChange, resetFormValues, setFormValues }}>
      {children}
    </FormValuesContext.Provider>
  );
};

// Create a custom hook for using the context
export const useFormValues = () => {
  return useContext(FormValuesContext);
};
