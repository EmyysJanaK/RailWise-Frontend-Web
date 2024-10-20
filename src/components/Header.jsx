import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/trainImage.png";
import UserMenu from "./UserMenu";
import NavLinkItem from "./NavLinkItem";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="relative flex flex-col items-center justify-between px-4 py-4 overflow-hidden text-white bg-gray-900 isolate sm:py-6 sm:px-20 sm:flex-row">
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-16 transition-all duration-300 transform sm:h-24 hover:scale-105"
          />
        </Link>
        <button
          className="text-3xl transition-colors duration-300 sm:hidden hover:text-gray-400"
          aria-label="Toggle navigation"
          onClick={toggleNav}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          isNavOpen ? "block" : "hidden"
        } sm:block w-full sm:w-auto mt-4 sm:mt-0`}
      >
        <ul className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-14">
          {navLinks.map((link) => (
            <NavLinkItem
              key={link.to}
              to={link.to}
              label={link.label}
              className="transition-colors duration-300 hover:text-gray-400"
            />
          ))}
        </ul>
      </nav>

      <UserMenu className="hidden sm:block" />
    </header>
  );
};

export default Header;
