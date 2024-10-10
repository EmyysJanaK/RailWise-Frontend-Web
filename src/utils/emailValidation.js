import axios from "axios";

export const validateEmail = async (email, setEmailError) => {
  try {
    const apiKey = import.meta.env.VITE_EMAIL_VALIDATION_API_KEY;
    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
    );
    const { deliverability, is_valid_format } = response.data;
    if (deliverability === "DELIVERABLE" && is_valid_format.value) {
      return true; // Email is valid
    } else {
      setEmailError("Invalid or undeliverable email address");
      return false; // Email is invalid
    }
  } catch (error) {
    console.error(error);
    setEmailError("Error validating email address");
    return false;
  }
};
