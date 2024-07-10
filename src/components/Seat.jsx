import React, { useState } from 'react';

const Seat = ({ name }) => {
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
      className={`p-4 m-2 border rounded-lg cursor-pointer 
        ${isSelected ? 'bg-blue-500 text-white' : 'bg-white'}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {name}
    </div>
  );
};

export default Seat;