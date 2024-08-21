import React, { useState } from 'react';

const Seat = ({ name, isBooked, isSelected, disabled }) => {

  const handleHover = (e) => {
    if (!isSelected) {
      e.target.classList.add('bg-blue-200');
    }
  };

  const handleMouseLeave = (e) => {
    if (!isSelected) {
      e.target.classList.remove('bg-blue-200');
    }
  };

  return (
    <div
      className={`border rounded-lg w-12 h-12 flex items-center justify-center border-gray-400
        ${isSelected ? 'bg-purple-900 text-white' : isBooked ? 'bg-red-300' : 'bg-white'} ${ (disabled || isBooked)? 'cursor-not-allowed' : 'cursor-pointer'}`}
      {...(!isBooked && { onMouseEnter: handleHover, onMouseLeave: handleMouseLeave })}

    >
      {name}
    </div>
  );
};

export default Seat;