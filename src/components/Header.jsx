import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/trainImage.png";
import UserMenu from "./UserMenu";
import NavLinkItem from "./NavLinkItem";

const Header = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/stations", label: "Stations" },
    { to: "/train-status", label: "Train Status" }
  ];

  return (
    <header className="bg-purple-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center">

      
      <div className="flex justify-between items-center w-full sm:w-auto">
        <Link to="/Home">
          <img
            src={logo}
            alt="Logo"
            className="h-24 sm:h-36" // Responsive image size
          />
        </Link>
        <button
          className="sm:hidden text-3xl"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>{" "}
          {/* FontAwesome icon for menu */}
        </button>
      </div>


      {/* Navigation Links */}
      <nav className="w-full sm:w-auto">
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {navLinks.map((link) => (
            <NavLinkItem key={link.to} to={link.to} label={link.label} />
          ))}
        </ul>
      </nav>


      <UserMenu />


      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <button className="hover:text-gray-300 transition duration-300 text-2xl">
          <span className="sr-only">Change Language</span>
          <i className="fas fa-language"></i>{" "}
          {/* FontAwesome icon for language */}
        </button>
        <button className="hover:text-gray-300 transition duration-300 text-2xl">
          <span className="sr-only">Search</span>
          <i className="fas fa-search"></i>{" "}
          {/* FontAwesome icon for search */}
        </button>
      </div>
    </header>
  );
};

export default Header;
