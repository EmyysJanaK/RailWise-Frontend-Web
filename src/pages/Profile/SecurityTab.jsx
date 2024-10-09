import React from "react";

const SecurityTab = ({ handleChangePasswordClick, handleDeleteAccountClick }) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Security & Privacy</h2>

      {/* Change Password Button */}
      <button
        onClick={handleChangePasswordClick}
        className="w-full py-2 mb-4 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
      >
        Change Password
      </button>


    </div>
  );
};

export default SecurityTab;
