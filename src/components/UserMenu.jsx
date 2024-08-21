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
    navigate('/login'); // Redirect to login page after logout
  };
  const handleProfile = () => {
    navigate('/profile'); // Redirect to login page after logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useOutsideClick(menuRef, () => setMenuOpen(false));

  return (
    <div className="mt-4 sm:mt-0">
      {!userData ? (
        <Link to="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition duration-300">
            Login
          </button>
        </Link>
      ) : (
        <div className="relative" ref={menuRef}>
          <button onClick={toggleMenu} className="flex items-center space-x-2">
          <FaRegUserCircle />
            <span className="font-bold">{`${userData.username}`}</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-20">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
              >
                Logout
              </button>
              <button
                onClick={handleProfile}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
              >
                profile
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
