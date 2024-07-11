import React, { useEffect, useState } from "react";
import Seat from "./Seat"; // Assuming the Seat component is in the same directory

const Wagon = ({ wagonNumber, seats, bookedSeats, handleSeatClick, selectedSeats, disableSlider }) => {

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto mt-8">
      <div className="relative w-[360px] h-[604px] p-4 bg-gray-200 border border-gray-400 rounded-xl">
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat._id);
          const isSelected = selectedSeats.find((selectedSeat) => selectedSeat._id === seat._id);
          return (
            <div
              key={seat._id}
              style={{
                position: "absolute",
                left: `${seat.position[0]}px`,
                top: `${seat.position[1]}px`,
              }}
              {...(!isBooked && !disableSlider && {
                onClick: () => handleSeatClick(seat, wagonNumber),
              })}
            >
              <Seat
                name={seat.name}
                isBooked={isBooked}
                isSelected={isSelected ? true : false}
                disabled={disableSlider}
              />
            </div>
          );
        })}

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
    </div>
  );
};

export default Wagon;
