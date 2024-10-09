// ConfirmationModal.jsx
import React from "react";
import PropTypes from "prop-types";
import Modal from "../../components/Modal"; // Adjust the path as necessary

const ConfirmationModal = ({ onClose, onConfirm, message }) => {
  return (
    <Modal onClose={onClose}>
        <h2 className="mb-4 text-xl font-bold">{message}</h2>
          <button
            onClick={onConfirm}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
          >
            Confirm
          </button>

    </Modal>
  );
};

ConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  message: "Are you sure you want to cancel this booking?",
};

export default ConfirmationModal;
