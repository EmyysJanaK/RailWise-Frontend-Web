// useProfile.jsx
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

export const useProfile = () => {
  const { userData, login } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  // Centralize form state
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    changesMade: false,
  });
  const handleInputChange = (field) => (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [field]: e.target.value,
      changesMade: true,
    }));
  };

  useEffect(() => {
    if (userData) {
      setFormValues({
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        oldPassword: "",
        newPassword: "",
        changesMade: false,
      });
    }
  }, [userData]);

  // Handle form input changes

  const handleNewPasswordChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      newPassword: e.target.value,
      changesMade: true,
    }));
  };

  const handleSaveSubmit = async () => {
    try {
      const { username, email, phone, oldPassword, newPassword } = formValues;

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateProfile`,
        { username, email, phone, oldPassword, newPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        login({ ...userData, username, email, phone });
        setIsEditing(false);
        toast.success("Profile updated successfully");
        resetFormValues();
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Failed to update profile");
    }
  };

  // Reset the form values to avoid stale values being reused
  const resetFormValues = () => {
    setFormValues({
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      oldPassword: "",
      newPassword: "",
      changesMade: false,
    });
    setShowModal(false);
    setShowChangePasswordModal(false);
  };

  const handleChangePasswordClick = (e) => {
    e.preventDefault();
    setShowChangePasswordModal(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return {
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    showModal,
    setShowModal,
    showChangePasswordModal,
    setShowChangePasswordModal,
    formValues,
    handleInputChange,
    handleNewPasswordChange,
    handleSaveSubmit,
    handleChangePasswordClick,
    handleSaveClick,
  };
};
