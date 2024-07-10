import React, { useEffect, useState } from "react";
import Seat from "./Seat"; // Assuming the Seat component is in the same directory

const Wagon = ({ wagonNumber, seats, bookedSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [finalSelectedSeats, setFinalSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      return;
    }
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  useEffect(() => {
    setFinalSelectedSeats(selectedSeats);
  }, [selectedSeats]);

  return (
    <div className="flex justify-between w-full max-w-5xl mx-auto mt-8">
      <div className="relative w-[360px] h-[604px] p-4 bg-gray-200 border border-gray-400 rounded-xl">
        {seats.map((seat) => (
          <div
            key={seat._id}
            style={{
              position: "absolute",
              left: `${seat.position[0]}px`,
              top: `${seat.position[1]}px`,
            }}
            onClick={() => handleSeatClick(seat._id)}
          >
            <Seat
              name={seat.name}
              isBooked={bookedSeats.includes(seat._id)}
              isSelected={selectedSeats.includes(seat._id)}
            />
          </div>
        ))}

        {/* Wagon number */}
        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-400 p-2 rounded-lg">
          Wagon {wagonNumber}
        </div>

        {/* Left side wheels */}

        <div className="absolute left-[-20px] top-[80px] w-6 h-24 bg-gray-600 rounded-lg"></div>
        <div className="absolute left-[-20px] bottom-[80px] w-6 h-24 bg-gray-600 rounded-lg"></div>

        {/* Right side wheels */}

        <div className="absolute right-[-20px] top-[80px] w-6 h-24 bg-gray-600 rounded-lg"></div>
        <div className="absolute right-[-20px] bottom-[80px] w-6 h-24 bg-gray-600 rounded-lg"></div>
      </div>
      {/* Displaying the selected seats as a one card */}
      <div className="w-64 bg-white border border-gray-400 rounded-xl p-4 ml-4">
        <h2 className="text-3xl font-bold mb-4">Display Seat Selection</h2>
        <p>Wagon Number: {wagonNumber}</p>
        <p>Selected Seats: {selectedSeats.length}</p>

        <ul>
          {selectedSeats.map((seatId) => {
            const seat = seats.find((seat) => seat._id === seatId);
            return <li key={seatId}>{seat.name}</li>;
          })}
        </ul>
      </div>

      {/* Displaying the final selected seats */}
      {/* <div className="w-64 bg-white border border-gray-400 rounded-xl p-4 ml-4">
        
        <ul>
          {finalSelectedSeats.map((seatId) => (
            <li key={seatId}>{seatId}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Wagon;
