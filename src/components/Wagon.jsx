import React from "react";
import Seat from "./Seat"; // Assuming the Seat component is in the same directory

const Wagon = ({ wagonNumber, seats, bookedSeats }) => {
    console.log("Ïnside Wagon")
    console.log("seats", seats);
    console.log("bookedSeats", bookedSeats);


  return (
    <div className="relative w-80 h-64 bg-gray-200 border border-gray-400 rounded-xl p-4">
      {seats.map((seat) => (
        <div
          key={seat._id}
          style={{
            position: "absolute",
            left: `${seat.position[0]}px`,
            top: `${seat.position[1]}px`,
          }}
        >
          <Seat name={seat.name} isBooked={bookedSeats.includes(seat._id)} />
        </div>
      ))}
      {/* Left side wheels */}

      <div className="absolute left-[-20px] top-34 w-6 h-12 bg-gray-800 rounded-lg"></div>
      <div className="absolute left-[-20px] top-48 w-6 h-12 bg-gray-800 rounded-lg"></div>

      {/* Right side wheels */}

      <div className="absolute right-[-20px] top-34 w-6 h-12 bg-gray-800 rounded-lg"></div>
      <div className="absolute right-[-20px] top-48 w-6 h-12 bg-gray-800 rounded-lg"></div>

    </div>
  );
};

export default Wagon;

