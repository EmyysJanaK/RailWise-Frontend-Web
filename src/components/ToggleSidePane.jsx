import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
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

const ToggleSidePane = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { reservationData, setReservationData } = useContext(ReservationContext);
  const navigate = useNavigate();
  const { pax } = reservationData;

  useEffect(() => {
    //  selectedSeats array length equals pax
    if (selectedSeats.length === pax) {
      setReservationData((prevData) => ({ ...prevData, selectedSeats }));
    }
  }, [selectedSeats, pax, setReservationData]);

  const togglePane = () => {
    setIsOpen(!isOpen);
  };

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
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
          <svg viewBox="0 0 270 210" width="270" height="210" className="border-black border">
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

        </div>
      </div>
    </div>
  );
};

export default ToggleSidePane;
