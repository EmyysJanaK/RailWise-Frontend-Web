import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  // Function to handle clicks on the background overlay
  const handleBackgroundClick = (event) => {
    // Ensure the click event target is the background and not the children
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackgroundClick} // Attach the click handler to the background
    >
      <div className="bg-white p-8 rounded-lg shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
