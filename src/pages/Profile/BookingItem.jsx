// BookingItem.jsx
import React, { useState } from "react";
import { FaTrain, FaClock } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

const BookingItem = ({ booking, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the confirmation modal
  const handleCancelClick = (e) => {
    e.preventDefault(); // Prevent any default action
    setIsModalOpen(true);
  };

  // Confirm deletion and call the onDelete function
  const handleConfirmDelete = () => {
    onDelete(booking._id);
    setIsModalOpen(false);
  };

  // Close the modal without deleting
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className="items-center justify-between p-6 mb-6 transition-transform transform bg-white border border-gray-300 shadow-lg cursor-pointer rounded-xl hover:shadow-xl hover:scale-105">
        <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
          <div className="flex items-center">
            <div className="mr-3 text-2xl font-bold text-indigo-700">
              Booking ID: {booking._id}
            </div>
          </div>

          <div className="flex items-center">
            <FaTrain className="text-3xl text-gray-800" />
            <div className="ml-3 text-2xl font-bold text-gray-700 capitalize">
              {booking.scheduleRef.trainRef.name}
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-xl font-bold text-gray-800">
              Total Price: LKR {booking.totalFare}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
          <div className="flex items-center">
            <div className="mr-3 text-lg text-gray-800">
              From: {booking.startHalt.stationRef.name}
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-lg text-gray-800">
              To: {booking.endHalt.stationRef.name}
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-xl text-gray-700">
              {booking.date.substring(0, 10)}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
          <div className="flex items-center">
            <FaClock className="mr-2 text-gray-500" />
            <div className="mr-3 text-xl text-gray-500">
              Departure: {booking.startHalt.departureTime}
            </div>
          </div>

          <div className="flex items-center">
            <FaClock className="mr-2 text-gray-500" />
            <div className="text-xl text-gray-500">
              Arrival: {booking.endHalt.arrivalTime}
            </div>
          </div>
        </div>

        {(new Date(booking.date).getTime() > new Date().getTime() && booking.status !== "cancelled") && (
          <div className="flex justify-between w-full p-6 bg-blue-100 rounded-lg">
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
            >
              Cancel Booking
            </button>
          </div>
        )}

        {booking.status === "cancelled" && (
          <div className="flex justify-between w-full p-6 bg-yellow-100 rounded-lg">
            <div className="text-lg font-bold text-yellow-800">
              Status: {booking.status}
            </div>
          </div>
        )}
      </li>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to cancel this booking?"
        />
      )}
    </>
  );
};

export default BookingItem;
