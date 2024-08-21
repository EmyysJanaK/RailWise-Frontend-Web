import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain, faChair } from "@fortawesome/free-solid-svg-icons";

const SeatSelectionDisplay = ({ selectedSeats, handleReset }) => {
    return (
        <div className="w-80 bg-white border border-gray-400 rounded-2xl p-10 fixed right-5 top-1/2 transform -translate-y-1/2 shadow-lg">
            
            <h2 className="text-xl font-semibold mb-6 text-gray-700 flex items-center">
                <FontAwesomeIcon icon={faTrain} className="mr-3 text-blue-500" />
                My Seat Selection
            </h2>
            <ul className="space-y-4">
                <li className="flex items-center">
                    <FontAwesomeIcon icon={faChair} className="mr-3 text-red-500" />
                    <span className="font-medium text-gray-600 flex items-center">
                        Total Seats Selected:
                    </span>
                    <span className="ml-3 text-gray-800">{selectedSeats.length}</span>
                </li>
                <li>
                    <span className="font-medium text-gray-600 flex items-center">
                        Selected Seats:
                    </span>
                    <ul className="ml-5 list-disc space-y-2">
                        {selectedSeats.map((seat) => (
                            <li
                                key={seat._id}
                                className="text-base text-gray-700 flex items-center"
                            >
                                <FontAwesomeIcon
                                    icon={faChair}
                                    className="mr-3 text-red-500"
                                />
                                <span className="font-medium">Seat:</span> {seat.name},{" "}
                                <FontAwesomeIcon
                                    icon={faTrain}
                                    className="mr-3 text-green-500"
                                />
                                <span className="font-medium">Wagon:</span> {seat.wagonNumber}
                            </li>
                        ))}
                        <button
                            onClick={handleReset}
                            className="bg-purple-900 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                        >
                            Reset Selection
                        </button>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SeatSelectionDisplay;