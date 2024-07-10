import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { FaTrain, FaClock, FaChair, FaDollarSign } from "react-icons/fa";


const TrainOption = ({ option, onClick }) => {
    const { reservationData, setReservationData } = useContext(ReservationContext);

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
            <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-between items-center md:items-start mb-4 md:mb-0">
                <div className="flex flex-col items-center md:items-start md:mr-4">
                    <FaTrain className="text-indigo-700 text-2xl mb-1" />
                    <div className="text-lg font-bold text-indigo-700">
                        {option.train.name} → {option.arrival}
                    </div>
                    <div className="text-gray-700 font-medium">
                        {option.fromHalt.name} → {option.toHalt.name}
                    </div>
                </div>
                
            </div>
			<div>
			<div className="flex flex-col items-center md:items-start md:mr-4">
                    <FaClock className="text-gray-600 text-xl mb-1" />
                    <div className="text-gray-600 text-sm md:text-base">
                        Duration: {option.duration}
                    </div>
                    <div className="text-gray-600 text-sm md:text-base">
                        Changes: {option.changes}
                    </div>
                </div>
			</div>
            <div className="w-full md:w-1/3 flex flex-col items-center bg-blue-100 p-6 rounded-lg">
                <div className="flex items-center mb-2">
                    <FaDollarSign className="text-gray-800 text-2xl mr-2" />
                    <div className="font-bold text-xl text-gray-800">
                        from ${option.price}
                    </div>
                </div>
                <div className="text-gray-600 font-semibold">
					<span>
                    <div className="flex items-center mb-1">
                        <FaChair className="text-indigo-900 mr-2" />
                        1st class seats: {option.seatAvailability.first}
                    </div>
					</span>
                    <div className="flex items-center mb-1">
                        <FaChair className="text-indigo-900 mr-2" />
                        2nd class seats: {option.seatAvailability.second}
                    </div>
					<span>
                    <div className="flex items-center">
                        <FaChair className="text-indigo-900 mr-2" />
                        3rd class seats: {option.seatAvailability.third}
                    </div>
					</span>
                </div>
            </div>
        </div>
    );
};

TrainOption.propTypes = {
    option: PropTypes.shape({
        id: PropTypes.string.isRequired,
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
        pax: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default TrainOption;
