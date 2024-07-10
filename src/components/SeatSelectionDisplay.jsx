import React, { useEffect, useState } from "react";


const SeatSelectionDisplay = ({ wagon, selectedSeats, setSelectedSeats }) => {
  const [finalSelectedSeats, setFinalSelectedSeats] = useState([]);

  useEffect(() => {
    setFinalSelectedSeats(selectedSeats);
  }, [selectedSeats]);

  return (
    <div className="w-64 bg-white border border-gray-400 rounded-xl p-4 ml-4">
      <h2 className="text-lg font-semibold">Selected Seats</h2>
      <ul>
        {finalSelectedSeats.map((seat) => (
          <li key={seat._id} className="flex justify-between items-center">
            <span>{seat.name}</span>
            <button
              onClick={() =>
                setSelectedSeats((prevSelectedSeats) =>
                  prevSelectedSeats.filter((id) => id !== seat._id)
                )
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
