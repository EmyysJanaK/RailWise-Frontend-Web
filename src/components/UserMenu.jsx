import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useOutsideClick from "../hooks/useOutsideClick";
import { FaRegUserCircle } from "react-icons/fa";

const UserMenu = () => {
  const { userData, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };
  const handleProfile = () => {
    navigate("/profile"); // Redirect to login page after logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useOutsideClick(menuRef, () => setMenuOpen(false));

  return (
    <div className="mt-4 sm:mt-0">
      {!userData ? (
        <Link to="/login">
          <button className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-400">
            Login
          </button>
        </Link>
      ) : (
        <div className="relative" ref={menuRef}>
          <button onClick={toggleMenu} className="flex items-center space-x-2">
            <FaRegUserCircle className="text-2xl text-gray-300" />
            <span className="text-xl font-bold">{`${userData.username}`}</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-0.5 z-20">
              <button
                onClick={handleLogout}
                className="block px-3 py-0.5 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
              >
                {" "}
                <div className="font-bold text-center">Logout</div>
              </button>
              <button
                onClick={handleProfile}
                className="block px-3 py-0.5 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
              >
                <div className="font-bold text-center">profile</div>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
