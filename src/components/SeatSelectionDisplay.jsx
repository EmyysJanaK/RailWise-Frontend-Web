import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain, faChair } from "@fortawesome/free-solid-svg-icons";



const SeatSelectionDisplay = ({ selectedSeats, handleReset }) => {
return (
    <div className="w-64 bg-white border border-gray-400 rounded-2xl p-6 fixed right-5 top-1/2 transform -translate-y-1/2 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faTrain} className="mr-2 text-blue-500" />
            My Seat Selection
        </h2>
        <ul className="space-y-3">
            <li className="flex items-center">
                <FontAwesomeIcon icon={faChair} className="mr-2 text-red-500" />
                <span className="font-medium text-gray-600 flex items-center">Total Seats Selected:</span>
                <span className="ml-2 text-gray-800">{selectedSeats.length}</span>
            </li>
            <li>
                <span className="font-medium text-gray-600 flex items-center">Selected Seats:</span>
                <ul className="ml-4 list-disc space-y-1">
                    {selectedSeats.map((seat) => (
                        <li key={seat._id} className="text-sm text-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faChair} className="mr-2 text-red-500" />
                            <span className="font-medium">Seat:</span> {seat.name},{" "}
                            <FontAwesomeIcon icon={faTrain} className="mr-2 text-green-500" />
                            <span className="font-medium">Wagon:</span> {seat.wagonNumber}
                        </li>
                    ))}
                <button onClick={handleReset} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            Reset Selection
                    </button>
                    
                </ul>
            </li>
        </ul>
    </div>
);
};

export default SeatSelectionDisplay;
