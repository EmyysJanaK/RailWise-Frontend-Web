import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../assets/trainImage.png';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

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
        <button className="sm:hidden text-3xl" aria-label="Toggle navigation">
          <i className="fas fa-bars"></i> {/* FontAwesome icon for menu */}
        </button>
      </div>
      {/* Navigation Links */}
      <nav className="w-full sm:w-auto">
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <li>
            <Link
              to="/"
              className={classNames(
                'px-4 py-2 bg-purple-500 text-white rounded transition duration-300',
                { 'bg-purple-700': isActive('/') }
              )}
              style={{ fontSize: '1rem', fontWeight: 'bold' }} // Increase the font size
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={classNames(
                'px-4 py-2 bg-purple-500 text-white rounded transition duration-300',
                { 'bg-purple-700': isActive('/about') }
              )}
              style={{ fontSize: '1rem', fontWeight: 'bold' }} // Increase the font size
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={classNames(
                'px-4 py-2 bg-purple-500 text-white rounded transition duration-300',
                { 'bg-purple-700': isActive('/contact') }
              )}
              style={{ fontSize: '1rem', fontWeight: 'bold' }} // Increase the font size
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/stations"
              className={classNames(
                'px-4 py-2 bg-purple-500 text-white rounded transition duration-300',
                { 'bg-purple-700': isActive('/stations') }
              )}
              style={{ fontSize: '1rem', fontWeight: 'bold' }} // Increase the font size
            >
              Stations
            </Link>
          </li>
          <li>
            <Link
              to="/train-status"
              className={classNames(
                'px-4 py-2 bg-purple-500 text-white rounded transition duration-300',
                { 'bg-purple-700': isActive('/train-status') }
              )}
              style={{ fontSize: '1rem', fontWeight: 'bold' }} // Increase the font size
            >
              Train
            </Link>
          </li>
        </ul>
      </nav>
      {/* Login Button */}
      <div className="mt-4 sm:mt-0">
        <Link to="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition duration-300">
            Login
          </button>
        </Link>
      </div>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <button className="hover:text-gray-300 transition duration-300 text-2xl">
          <span className="sr-only">Change Language</span>
          <i className="fas fa-language"></i> {/* FontAwesome icon for language */}
        </button>
        <button className="hover:text-gray-300 transition duration-300 text-2xl">
          <span className="sr-only">Search</span>
          <i className="fas fa-search"></i> {/* FontAwesome icon for search */}
        </button>
      </div>
    </header>
  );
};

export default Header;
