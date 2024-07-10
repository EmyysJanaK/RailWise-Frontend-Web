import React from "react";
import Seat from "./Seat"; // Assuming the Seat component is in the same directory

const Wagon = ({ wagonNumber, seats, bookedSeats }) => {
    console.log("Ïnside Wagon")
    console.log("seats", seats);
    console.log("bookedSeats", bookedSeats);


  return (
    <div className="relative w-[360px] h-[604px] p-4 bg-gray-200 border border-gray-400 rounded-xl">
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
  );
};

export default Wagon;

