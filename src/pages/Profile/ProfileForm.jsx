// ProfileForm.jsx
import React from "react";
import ConfirmationModalWithPassword from "./ConfirmationModalWithPassword";
import ChangePasswordModal from "./ChangePasswordModal"; 
import { useProfile } from "../../hooks/useProfile"; 

const inputFields = [
  {
    label: "Username",
    type: "text",
    name: "username",
    prefix: null,
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    prefix: null,
  },
  {
    label: "Phone",
    type: "tel",
    name: "phone",
    prefix: "+94",
  },
];

const ProfileForm = () => {
  const {
    isEditing,
    setIsEditing,
    showModal,
    setShowModal,
    showChangePasswordModal,
    handleChangePasswordClick,
    handleSaveClick,
    handleSaveSubmit,
    formValues,
    handleInputChange,
    setShowChangePasswordModal,
  } = useProfile();

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Profile</h2>
      <form>
        {inputFields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block mb-1 text-gray-700">{field.label}</label>
            {field.prefix ? (
              <div className="flex">
                <span className="inline-flex items-center px-3 text-gray-700 bg-gray-200 border border-r-0 border-blue-400 rounded-l-lg">
                  {field.prefix}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  className="w-full px-4 py-2 border border-blue-400 rounded-r-lg bg-gray-100 focus:outline-none focus:bg-white focus:border-blue-500"
                  value={formValues[field.name]}
                  onChange={handleInputChange(field.name)}
                  readOnly={!isEditing}
                />
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                className="w-full px-4 py-2 border border-blue-400 rounded-lg bg-gray-100 focus:outline-none focus:bg-white focus:border-blue-500"
                value={formValues[field.name]}
                onChange={handleInputChange(field.name)}
                readOnly={!isEditing}
              />
            )}
          </div>
        ))}

        {/* Save and Cancel Buttons (Only in Edit Mode) */}
        {isEditing && (
          <div className="flex gap-4">
            <button
              onClick={handleSaveClick}
              className={`w-full py-2 text-white bg-purple-600 rounded-lg shadow-md transition-all duration-200 ${
                formValues.changesMade ? "hover:bg-purple-700" : "cursor-not-allowed"
              }`}
              disabled={!formValues.changesMade}
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
        <div className="text-right mt-4">
          <button
            onClick={handleChangePasswordClick}
            className="px-4 py-2 text-white bg-gray-700 rounded-lg shadow-md hover:bg-gray-800"
          >
            Change Password
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModalWithPassword
          onClose={() => setShowModal(false)}
          onSubmit={handleSaveSubmit}
          formValues={formValues}
          handleInputChange={handleInputChange}
        />
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSaveSubmit={handleSaveSubmit}
        />
      )}
    </div>
  );
};

export default ProfileForm;
