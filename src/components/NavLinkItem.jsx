// components/NavLinkItem.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const NavLinkItem = ({ to, label }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <li>
      <Link
        to={to}
        className={classNames(
          "px-4 py-2 bg-purple-500 text-white rounded transition duration-300",
          { "bg-purple-700": isActive(to) }
        )}
        style={{ fontSize: "1rem", fontWeight: "bold" }} // Increase the font size
      >
        {label}
      </Link>
    </li>
  );
};

export default NavLinkItem;
