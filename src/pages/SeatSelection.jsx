import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReservationContext } from "../context/ReservationContext";

const seats = [
  { id: '1A', x: 20, y: 20 },
  { id: '1B', x: 60, y: 20 },
  { id: '1C', x: 100, y: 20 },
  { id: '1D', x: 180, y: 20 },
  { id: '1E', x: 220, y: 20 },
  { id: '2A', x: 20, y: 60 },
  { id: '2B', x: 60, y: 60 },
  { id: '2C', x: 100, y: 60 },
  { id: '2D', x: 180, y: 60 },
  { id: '2E', x: 220, y: 60 },
  { id: '3A', x: 20, y: 120 },
  { id: '3B', x: 60, y: 120 },
  { id: '3C', x: 100, y: 120 },
  { id: '3D', x: 180, y: 120 },
  { id: '3E', x: 220, y: 120 },
  { id: '4A', x: 20, y: 160 },
  { id: '4B', x: 60, y: 160 },
  { id: '4C', x: 100, y: 160 },
  { id: '4D', x: 180, y: 160 },
  { id: '4E', x: 220, y: 160 },
];

const SeatSelectionPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { reservationData, setReservationData } = useContext(ReservationContext);
  const navigate = useNavigate();
  const { pax } = reservationData;

  useEffect(() => {
    if (selectedSeats.length === pax) {
      setReservationData((prevData) => ({ ...prevData, selectedSeats }));
    }
  }, [selectedSeats, pax, setReservationData]);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  const handleConfirmSelection = () => {
    navigate('/ReservationSummary'); // Adjust the navigation target as needed
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Seat Selection</h2>
        <svg viewBox="0 0 270 210" width="270" height="210" className="border-black border mx-auto">
          <rect x="10" y="10" width="250" height="190" stroke="black" fill="none" />
          {seats.map((seat) => (
            <React.Fragment key={seat.id}>
              <rect
                x={seat.x}
                y={seat.y}
                width="30"
                height="30"
                stroke="black"
                fill={selectedSeats.includes(seat.id) ? 'green' : 'gray'}
                onClick={() => handleSeatClick(seat.id)}
                className="cursor-pointer hover:fill-blue-500 transition duration-300"
              />
              <text
                x={seat.x + 15}
                y={seat.y + 20}
                fontSize="12"
                fill="black"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {seat.id}
              </text>
            </React.Fragment>
          ))}
        </svg>
        <div className="text-center mt-6">
          <button
            onClick={handleConfirmSelection}
            className="bg-purple-900 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300"
            disabled={selectedSeats.length !== pax}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
