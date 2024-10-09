// ChangePasswordModal.jsx
import React from "react";
import Modal from "../../components/Modal";

const ChangePasswordModal = ({ onClose, formValues, handleInputChange, handleSaveSubmit }) => {
  return (
    <Modal onClose={onClose}>
      <h2 className="mb-4 text-xl font-bold">Change Password</h2>
      <input
        type="password"
        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="Old Password"
        value={formValues.oldPassword}
        onChange={handleInputChange("oldPassword")}
      />
      <input
        type="password"
        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="New Password"
        value={formValues.newPassword}
        onChange={handleInputChange("newPassword")}
      />
      <button
        onClick={handleSaveSubmit}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
        disabled={!formValues.oldPassword || !formValues.newPassword}
      >
        Change Password
      </button>
    </Modal>
  );
};

export default ChangePasswordModal;
