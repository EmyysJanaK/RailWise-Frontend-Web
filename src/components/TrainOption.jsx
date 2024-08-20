import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { FaTrain, FaClock, FaChair } from "react-icons/fa";

const TrainOption = ({ option, onClick }) => {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);

  useEffect(() => {
    console.log("TrainOption rendered");
  }, []);

  return (
    <div
      className="border border-gray-300 p-6 mb-6 justify-between items-center bg-white rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => {
        setReservationData({
          ...reservationData,
          seatAvailability: option.seatAvailability,
          departureTime: option.fromHalt.departureTime,
          arrivalTime: option.toHalt.arrivalTime,
          scheduleId: option.id,
          fromHaltId: option.fromHalt.id,
          toHaltId: option.toHalt.id,
        });
        onClick();
      }}
    >
      <div className="w-full flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex items-center">
          <div className="text-lg font-bold text-indigo-700 mr-3">
            {option.scheduleType.toUpperCase()}
          </div>
          <FaTrain className="text-gray-800 text-4xl" />
        </div>

        <div className="text-2xl font-bold text-gray-800">
          {option.train.name.toUpperCase( )}
        </div>

        <div className="flex items-center">
          
          <div className="font-bold text-xl text-gray-800">
            FROM ${option.price}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex items-center">
          <div className="text-lg font-bold text-gray-800 mr-3">
            {option.fromHalt.name.toUpperCase()}
          </div>
        </div>

        <div className="text-lg font-bold text-indigo-700">
          {option.duration.toUpperCase()}
        </div>

        <div className="flex items-center">
          
          <div className="font-bold text-xl text-gray-800">
            {option.toHalt.name.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex items-center">
          <div className="text-lg font-bold text-gray-800 mr-3">
            {option.fromHalt.departureTime.toUpperCase()}
          </div>
        </div>
        
        {/* <div className="text-lg font-bold text-indigo-700 ">
            
          {option.duration.toUpperCase() } 
        </div> */}

        <div className="flex items-center">
          
          <div className="font-bold text-xl text-gray-800">
            {option.toHalt.arrivalTime.toUpperCase()}
          </div>
        </div>
      </div>
      

      <div className="w-full flex bg-blue-100 p-6 rounded-lg justify-between">
        {/* <div className="text-gray-600 font-semibold flex flex-wrap"> */}
          <div className="flex items-center mr-6 mb-2">
            <FaChair className="text-indigo-900 mr-2 size-8" />
            <span>First : {option.seatAvailability.first}</span>
          </div>

          <div className="flex items-center mr-6 mb-2">
            <FaChair className="text-indigo-900 mr-2 size-8" />
            <span> Second : {option.seatAvailability.second}</span>
          </div>

          <div className="flex items-center mb-2">
            <FaChair className="text-indigo-900 mr-2 size-8" />
            <span> Third : {option.seatAvailability.third}</span>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

TrainOption.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    scheduleType: PropTypes.string.isRequired,
    departureDate: PropTypes.string.isRequired,
    fromHalt: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      departureTime: PropTypes.string.isRequired,
      platform: PropTypes.number.isRequired,
    }).isRequired,
    toHalt: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      arrivalTime: PropTypes.string.isRequired,
      platform: PropTypes.number.isRequired,
    }).isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    seatAvailability: PropTypes.shape({
      first: PropTypes.number.isRequired,
      second: PropTypes.number.isRequired,
      third: PropTypes.number.isRequired,
    }).isRequired,
    train: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TrainOption;
