import React, { useState } from 'react';

const Seat = ({ name, isBooked }) => {
  const [isSelected, setIsSelected] = useState(false);

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

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`border rounded-lg w-12 h-12 flex items-center justify-center border-gray-400
        ${isSelected ? 'bg-blue-500 text-white cursor-pointer' : isBooked ? 'bg-red-300' : 'bg-white cursor-pointer'}`}
      {...(!isBooked && { onClick: handleClick, onMouseEnter: handleHover, onMouseLeave: handleMouseLeave })}

    >
      {name}
    </div>
  );
};

export default Seat;