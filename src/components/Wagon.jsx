import React from "react";
import Seat from "./Seat"; // Assuming the Seat component is in the same directory

const Wagon = ({ wagonNumber, seats, bookedSeats }) => {
    console.log("Ïnside Wagon")
    console.log("seats", seats);
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
          <Seat name={seat.name} />
        </div>
      ))}
    </div>
  );
};

export default Wagon;
