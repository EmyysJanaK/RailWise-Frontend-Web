import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClipboardList, faLock } from "@fortawesome/free-solid-svg-icons";

const SideMenu = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 p-4 text-white bg-gray-800">
      <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>
      <ul>
        {/* Profile Tab */}
        <li
          className={`mb-4 ${activeTab === "profile" ? "text-blue-500" : ""}`}
        >
          <button
            onClick={() => setActiveTab("profile")}
            className="flex items-center"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </button>
        </li>

        {/* Bookings Tab */}
        <li
          className={`mb-4 ${activeTab === "bookings" ? "text-blue-500" : ""}`}
        >
          <button
            onClick={() => setActiveTab("bookings")}
            className="flex items-center"
          >
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
            Bookings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
