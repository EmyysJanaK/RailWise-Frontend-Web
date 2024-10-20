import React from "react";
import "./LoadingModal.css"; // For the CSS styles
import trainImg from "../assets/train_full.svg"; // Import train image

export default function LoadingModal() {
  return (
    <div className="loading-modal-content">
      <h4 className="loading-modal-text">
        We are looking for the best schedules for you
      </h4>
      <img src={trainImg} alt="Loading train" className="loading-modal-train" />
    </div>
  );
}
