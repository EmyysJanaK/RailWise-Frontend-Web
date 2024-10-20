// TrainOption.jsx
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { UserContext } from "../context/UserContext";
import { FaTrain, FaClock } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import PopUp from "./PopUp";
import { useNavigate, useLocation } from "react-router-dom"; // Import hooks

const TrainOption = ({ option, onClick }) => {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);
  const { userData } = useContext(UserContext);
  const [showPopUp, setShowPopUp] = useState(false);

  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get current location

  const handleTrainOptionClick = () => {
    if (userData) {
      // User is logged in, proceed to booking
      setReservationData({
        ...reservationData,
        scheduleId: option.id,
        fromHaltId: option.fromHalt.id,
        toHaltId: option.toHalt.id,
        trainId: option.train.id,
        seatAvailability: option.seatAvailability,
        departureTime: option.fromHalt.departureTime,
        arrivalTime: option.toHalt.arrivalTime,
      });
      onClick(); // Proceed with the train selection
    } else {
      // User is not logged in, show pop-up
      setShowPopUp(true);
    }
  };

  const handlePopUpClose = () => {
    setShowPopUp(false);
    setReservationData({
      ...reservationData,
      scheduleId: option.id,
      fromHaltId: option.fromHalt.id,
      toHaltId: option.toHalt.id,
      trainId: option.train.id,
      seatAvailability: option.seatAvailability,
      departureTime: option.fromHalt.departureTime,
      arrivalTime: option.toHalt.arrivalTime,
    });
    onClick(); // Proceed with the train selection
  };

  const handlePopUpLogin = () => {
    navigate("/login", { state: { from: location } });
  };

  return (
    <>
      {showPopUp && (
        <PopUp onClose={handlePopUpClose} onLogin={handlePopUpLogin} />
      )}
      <div
        className="items-center justify-between p-6 mb-6 transition-transform transform bg-white border border-gray-300 shadow-lg cursor-pointer rounded-xl hover:shadow-xl hover:scale-105"
        onClick={handleTrainOptionClick}
      >
        <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
          <div className="flex items-center">
            <div className="mr-3 text-2xl font-bold text-indigo-700 capitalize">
              {option.scheduleType}
            </div>
          </div>

          <div className="flex items-center">
            <FaTrain className="text-3xl text-gray-800" />
            <div className="ml-3 text-2xl font-bold text-gray-700 capitalize">
              {option.train.name}
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-xl font-bold text-gray-800">
              From LKR {option.price}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
          <div className="flex items-center">
            <div className="mr-3 text-lg text-gray-800">
              {option.fromHalt.name}
            </div>
          </div>

          <div className="flex items-center text-xl text-gray-700 capitalize">
            <FaClock className="mr-2 text-gray-500" />
            {option.duration}
          </div>

          <div className="flex items-center">
            <div className="text-lg text-gray-800">{option.toHalt.name}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
          <div className="text-xl text-gray-500">
            {option.fromHalt.departureTime}
          </div>
          <div className="text-xl text-gray-500">
            {option.toHalt.arrivalTime}
          </div>
        </div>

        <div className="flex justify-between w-full p-6 bg-blue-100 rounded-lg">
          <div className="flex items-center mb-2 mr-6">
            <MdChair className="mr-2 text-indigo-900 size-8" />
            <span>First : {option.seatAvailability.first}</span>
          </div>
          <div className="flex items-center mb-2 mr-6">
            <MdChair className="mr-2 text-indigo-900 size-8" />
            <span>Second : {option.seatAvailability.second}</span>
          </div>
          <div className="flex items-center mb-2">
            <MdChair className="mr-2 text-indigo-900 size-8" />
            <span>Third : {option.seatAvailability.third}</span>
          </div>
        </div>
      </div>
    </>
  );
};

TrainOption.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    scheduleType: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    fromHalt: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      departureTime: PropTypes.string.isRequired,
    }).isRequired,
    toHalt: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      arrivalTime: PropTypes.string.isRequired,
    }).isRequired,
    seatAvailability: PropTypes.shape({
      first: PropTypes.number.isRequired,
      second: PropTypes.number.isRequired,
      third: PropTypes.number.isRequired,
    }).isRequired,
    train: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TrainOption;
