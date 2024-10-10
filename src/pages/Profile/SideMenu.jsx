// SideMenu.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClipboardList, faLock, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const SideMenu = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">


      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul>
          {/* Profile Tab */}
          <li className="mb-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center w-full px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 ${
                activeTab === "profile"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FontAwesomeIcon icon={faUser} className="mr-3 w-5 h-5" />
              Profile
            </button>
          </li>

          {/* Bookings Tab */}
          <li className="mb-4">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex items-center w-full px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 ${
                activeTab === "bookings"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FontAwesomeIcon icon={faClipboardList} className="mr-3 w-5 h-5" />
              Bookings
            </button>
          </li>


        </ul>
      </nav>


    </div>
  );
};

export default SideMenu;
