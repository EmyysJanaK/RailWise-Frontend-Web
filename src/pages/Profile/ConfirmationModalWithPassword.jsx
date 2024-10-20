// ConfirmationModalWithPassword.jsx
import React, { useState, useContext } from "react";
import Modal from "../../components/Modal";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

// Define the Zod schema for password validation

const ConfirmationModalWithPassword = ({ onClose, formData,resetProfileForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const { userData, login } = useContext(UserContext);

  const handleClose = () => {
    setOldPassword("");
    onClose();
  };
  const handleProfileSubmit = async () => {
    try {
      const { username, email, phone } = formData;

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateProfile`,
        { username, email, phone, oldPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        login({ ...userData, username, email, phone });
        setIsEditing(false);
        toast.success("Profile updated successfully");
        resetProfileForm();
        console.log("Profile updated successfully");
      } else {
        console.error("Unexpected response status");
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Incorrect password");
        } else {
          toast.error(
            `Error: ${
              error.response.data.message || "Failed to update profile"
            }`
          );
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server. Please try again later.");
      } else {
        console.error("Error setting up request:", error.message);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setOldPassword("");
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6 text-center">
        <svg
          className="w-12 h-12 mx-auto mb-4 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h2 className="mb-5 text-lg font-normal text-gray-500">
          Enter Password to Confirm
        </h2>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-2.5 text-gray-600"
          >
            {showPassword ? <LuEye /> : <LuEyeOff />}
          </button>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleProfileSubmit}
            className="text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5"
            disabled={!oldPassword.length > 0}
          >
            Confirm
          </button>
          <button
            onClick={() => handleClose()}
            type="button"
            className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModalWithPassword;
