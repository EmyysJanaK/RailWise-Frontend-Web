import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain, faChair, faRedo } from "@fortawesome/free-solid-svg-icons";

const SeatSelectionDisplay = ({ selectedSeats, handleReset }) => {
  return (
    <div className="fixed p-8 transform -translate-y-1/2 bg-white border border-gray-300 shadow-lg w-80 rounded-3xl right-6 top-1/2">
      <h2 className="flex items-center mb-6 text-2xl font-semibold text-gray-800">
        <FontAwesomeIcon icon={faTrain} className="mr-3" />
        My Seat Selection
      </h2>
      <ul className="space-y-4">
        <li className="flex items-center">
          <FontAwesomeIcon icon={faChair} className="mr-3 text-purple-700" />
          <span className="font-medium text-gray-600">
            Total Seats Selected:
          </span>
          <span className="ml-2 text-lg font-bold text-gray-800">
            {selectedSeats.length}
          </span>
        </li>
        <li>
          <span className="font-medium text-gray-600">Selected Seats:</span>
          <ul className="mt-3 space-y-2">
            {selectedSeats.map((seat) => (
              <li
                key={seat._id}
                className="flex items-center p-2 bg-gray-100 rounded-lg shadow-sm"
              >
                <FontAwesomeIcon
                  icon={faChair}
                  className="mr-3 text-purple-700"
                />
                <span className="font-semibold text-gray-700">Seat:</span>
                <span className="ml-1 text-gray-800">{seat.name}</span>
                <FontAwesomeIcon
                  icon={faTrain}
                  className="ml-4 mr-2 text-purple-900"
                />
                <span className="font-semibold text-gray-700">Wagon:</span>
                <span className="ml-1 text-gray-800">{seat.wagonNumber}</span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <button
        onClick={handleReset}
        className="flex items-center justify-center w-full px-5 py-3 mt-6 font-semibold text-white transition duration-300 bg-purple-900 rounded-lg shadow-md hover:bg-purple-800"
      >
        <FontAwesomeIcon icon={faRedo} className="mr-2" />
        Reset Selection
      </button>
    </div>
  );
};

export default SeatSelectionDisplay;
