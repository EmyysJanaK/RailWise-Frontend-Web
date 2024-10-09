// ConfirmationModal.jsx
import React from "react";
import Modal from "../../components/Modal";

const ConfirmationModalWithPassword = ({ onClose, onSubmit, formValues, handleInputChange }) => {
  return (
    <Modal onClose={onClose}>
      <h2 className="mb-4 text-xl font-bold">Enter Password to Confirm</h2>
      <input
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="Old Password"
        value={formValues.oldPassword}
        onChange={handleInputChange("oldPassword")}
      />
      <button
        onClick={onSubmit}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
        disabled={!formValues.oldPassword}
      >
        Confirm
      </button>
    </Modal>
  );
};

export default ConfirmationModalWithPassword;
