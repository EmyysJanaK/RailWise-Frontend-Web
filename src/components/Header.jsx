import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';


const Header = () => {
  const location = useLocation();

  // Function to determine if a link is active based on the current path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="relative bg-blue-600 text-white p-4 flex flex-col items-center">
      {/* Sliding Banner */}
      <div className="w-full overflow-hidden h-8 mb-4 bg-purple-500 text-black-600 flex items-center justify-center">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-4">Welcome to Train Booking System!</span>
          <span className="mx-4">Enjoy seamless travel experiences.</span>
          <span className="mx-4">Check train status and book tickets easily.</span>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        {/* Animated Logo (Example: Rotate Animation) */}
        <h1 className="text-4xl font-bold text-yellow-500 transform rotate-3">
          <Link to="/" className="hover:underline">
            TrailWise
          </Link>
        </h1>
        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/#"
                className={classNames(
                  'text-yellow-500',
                  'hover:text-yellow-300',
                  'transition duration-300',
                  { 'underline': isActive('/Home') }
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={classNames(
                  'text-yellow-500',
                  'hover:text-yellow-300',
                  'transition duration-300',
                  { 'underline': isActive('/about') }
                )}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={classNames(
                  'text-yellow-500',
                  'hover:text-yellow-300',
                  'transition duration-300',
                  { 'underline': isActive('/contact') }
                )}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/Stations"
                className={classNames(
                  'text-yellow-500',
                  'hover:text-yellow-300',
                  'transition duration-300',
                  { 'underline': isActive('/Stations') }
                )}
              >
                Stations
              </Link>
            </li>
            <li>
              <Link
                to="/Train Status"
                className={classNames(
                  'text-yellow-500',
                  'hover:text-yellow-300',
                  'transition duration-300',
                  { 'underline': isActive('/Train Status') }
                )}
              >
                Train Status
              </Link>
            </li>
          </ul>
        </nav>
        {/* Login Button */}
        <div>
          <Link to="/LoginCustomer">
            <button className="bg-blue-500 text-black-900 px-4 py-2 rounded-full hover:bg-purple-400 transition duration-300">
              Login Customer
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
