import React, { useState } from "react";
import classNames from "classnames";

const ToggleSidePane = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePane = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-full">
      <button
        onClick={togglePane}
        className="bg-purple-900 text-white px-4 py-2 rounded-full fixed top-1/2 right-4 z-10 transform -translate-y-1/2 hover:bg-purple-700 transition duration-300"
      >
        {isOpen ? "Close" : "Open"} <span className="font-semibold">Seats</span>
      </button>
      <div
        className={classNames(
          "fixed top-1/2 right-0 h-1/2 bg-white shadow-lg transition-transform duration-300 ease-in-out transform -translate-y-1/2 overflow-y-auto",
          {
            "translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
        style={{ width: "300px" }}
      >
        <div className="p-4">
          <h2 className="text-3xl font-bold mb-4">Seat Selection</h2>
          <p className="mb-4">Please select your preferred seats from the options below:</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="seat1" className="mr-2" />
              <label htmlFor="seat1" className="text-lg">Seat 1A</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="seat2" className="mr-2" />
              <label htmlFor="seat2" className="text-lg">Seat 1B</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="seat3" className="mr-2" />
              <label htmlFor="seat3" className="text-lg">Seat 2A</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="seat4" className="mr-2" />
              <label htmlFor="seat4" className="text-lg">Seat 2B</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleSidePane;
