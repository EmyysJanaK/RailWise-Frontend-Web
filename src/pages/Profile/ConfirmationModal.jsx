// ConfirmationModal.jsx
import React from "react";
import PropTypes from "prop-types";
import Modal from "../../components/Modal"; 

const ConfirmationModal = ({ onClose, onConfirm, message }) => {
  return (
    <Modal onClose={onClose}>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12"
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
              {message}
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onConfirm}
                type="button"
                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                type="button"
                className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Cancel
              </button>
            </div>
          </div>

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
