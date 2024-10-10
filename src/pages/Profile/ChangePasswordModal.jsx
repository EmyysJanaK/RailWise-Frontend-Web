import React, { useState, useContext } from "react";
import Modal from "../../components/Modal";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "../../context/UserContext"; 

const passwordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, { message: "Old password must be at least 6 characters long." }),
  newPassword: z
    .string()
    .min(6, { message: "New password must be at least 6 characters long." }),
});

const ChangePasswordModal = ({ onClose }) => {
  const { userData, login } = useContext(UserContext); // Access UserContext
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleChangePasswordSubmit = async (data) => {
    try {
      const { oldPassword, newPassword } = data;
      const { username, email, phone } = userData;
      const response = await axios.put(
        "/api/user/updateProfile", 
        {username,email, phone, oldPassword, newPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully");
        reset(); 
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Incorrect old password");
        } else {
          toast.error(
            `Error: ${error.response.data.message || "Failed to change password"}`
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
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        {/* Header with Icon */}
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-gray-400 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-xl font-bold">Change Password</h2>
        </div>

        <form onSubmit={handleSubmit(handleChangePasswordSubmit)}>
          {/* Old Password Field */}
          <div className="relative mb-4">
            <input
              type={showOldPassword ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:bg-white focus:border-blue-500 ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Old Password"
              {...register("oldPassword")}
            />
            <button
              type="button"
              onClick={toggleOldPasswordVisibility}
              className="absolute right-3 top-2.5 text-gray-600"
            >
              {showOldPassword ? (
                <LuEyeOff className="w-5 h-5" />
              ) : (
                <LuEye className="w-5 h-5" />
              )}
            </button>
            {errors.oldPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* New Password Field */}
          <div className="relative mb-4">
            <input
              type={showNewPassword ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:bg-white focus:border-blue-500 ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="New Password"
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute right-3 top-2.5 text-gray-600"
            >
              {showNewPassword ? (
                <LuEyeOff className="w-5 h-5" />
              ) : (
                <LuEye className="w-5 h-5" />
              )}
            </button>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className={`px-4 py-2 text-white bg-purple-700 rounded-lg shadow-md transition-all duration-200 hover:bg-purple-800 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change Password"}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-200 hover:bg-gray-100 hover:text-blue-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
