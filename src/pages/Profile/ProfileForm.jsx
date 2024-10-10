// ProfileForm.jsx
import React, { useState, useEffect, useContext  } from "react";
import { useForm } from "react-hook-form";
import ConfirmationModalWithPassword from "./ConfirmationModalWithPassword";
import ChangePasswordModal from "./ChangePasswordModal";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validation";

// Define the Zod schema for profile validation
const profileSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^\+?\d{9}$/, { message: "Invalid phone number." }),
});

const ProfileForm = () => {
  const { userData, login } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [formData, setFormData] = useState();


  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isDirty  },
    setValue: setValueProfile,
    reset: resetProfileForm,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });


  // useForm instance for password changes
  // const {
  //   register: registerPassword,
  //   handleSubmit: handleSubmitPassword,
  //   formState: { errors: passwordErrors },
  //   reset: resetPasswordForm,
  // } = useForm({
  //   resolver: zodResolver(passwordSchema),
  //   defaultValues: {
  //     oldPassword: "",
  //     newPassword: "",
  //   },
  // });

  useEffect(() => {
    if (userData) {
      resetProfileForm({
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData, setValueProfile,isEditing]);



  const handleShowModalProfile = (data) => {
    setShowProfileModal(true);
    setFormData(data);
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Profile</h2>
      <form onSubmit={handleSubmitProfile(handleShowModalProfile)}>
        {/* Username Field */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Username</label>
          <input
            type="text"
            name="username"
           className={`w-full px-4 py-2 border border-blue-400 rounded-lg bg-gray-100 focus:outline-none focus:bg-white focus:border-blue-500 ${
              profileErrors.username ? "border-red-500" : ""
            }`}
            {...registerProfile("username")}
            disabled={!isEditing}
          />
          {profileErrors.username && (
            <p className="mt-1 text-sm text-red-500">{profileErrors.username.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
           className={`w-full px-4 py-2 border border-blue-400 rounded-lg bg-gray-100 focus:outline-none focus:bg-white focus:border-blue-500 ${
              profileErrors.email ? "border-red-500" : ""
            }`}
            {...registerProfile("email")}
            disabled={!isEditing}
          />
          {profileErrors.email && (
            <p className="mt-1 text-sm text-red-500">{profileErrors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Phone</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-gray-700 bg-gray-200 border border-r-0 border-blue-400 rounded-l-lg">
              +94
            </span>
            <input
              type="tel"
              name="phone"
              className={`w-full px-4 py-2 border border-blue-400 rounded-r-lg bg-gray-100 focus:outline-none focus:bg-white focus:border-blue-500 ${
                profileErrors.phone ? "border-red-500" : ""
              }`}
              {...registerProfile("phone")}
              disabled={!isEditing}
            />
          </div>
          {profileErrors.phone && (
            <p className="mt-1 text-sm text-red-500">{profileErrors.phone.message}</p>
          )}
        </div>

        {/* Save and Cancel Buttons (Only in Edit Mode) */}
        {isEditing && (
          <div className="flex gap-4">
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-lg shadow-md transition-all duration-200 
                ${isDirty ? "hover:bg-purple-800 bg-purple-700" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!isDirty}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full py-2 text-white bg-red-600 rounded-lg shadow-md transition-all duration-200 hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Edit Button (Only in View Mode) */}
        {!isEditing && (
          <div className="text-right">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Change Password Button */}
      </form>
        <div className="text-right mt-1">
          <button
            onClick={() => setShowChangePasswordModal(true)}
            className="px-4 py-2 text-white bg-gray-700 rounded-lg shadow-md hover:bg-gray-800"
          >
            Change Password
          </button>
        </div>

      {/* Confirmation Modal for Profile Update */}
      {showProfileModal && (
        <ConfirmationModalWithPassword
          onClose={() => setShowProfileModal(false)}
          formData={formData}
        />
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileForm;
