import React from "react";
import PropTypes from "prop-types";

const PopUp = ({ onClose, onLogin }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-center">HELLO!</h2>
        <p className="mb-6 text-center">
          As a registered user, you can view your booking history, cancel
          bookings, and receive exclusive updates!
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-10 py-2 font-semibold text-white bg-purple-900 rounded-lg hover:bg-gray-700"
            onClick={onLogin}
          >
            Login
          </button>
          <button
            className="px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600"
            onClick={onClose}
          >
            Continue Without Login
          </button>
        </div>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default PopUp;
