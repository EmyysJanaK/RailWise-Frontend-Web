import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import SeatOption from "../components/SeatOption";
import { ReservationContext } from "../context/ReservationContext";

import { FaTrain, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const Options = () => {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { fromHaltId, toHaltId, scheduleId, departureDate, pax } = reservationData;

  const [selectedClass, setSelectedClass] = useState(null);

  const [scheduleInfo, setScheduleInfo] = useState({});
  const [classInfo, setClassInfo] = useState({});

  useEffect(() => {
    const getSeats = async () => {
      try {
        const response = await axios.get("/api/schedules/scheduleDetails", {
          params: {
            fromHaltId: fromHaltId,
            toHaltId: toHaltId,
            scheduleId: scheduleId,
            date: departureDate,
          },
        });
        setScheduleInfo({
          schedule: response.data.schedule,
          fromHalt: response.data.fromHalt,
          toHalt: response.data.toHalt,
        });

        setClassInfo(response.data.classesDetails);
        1;

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load seat options. Please try again later.");
        setLoading(false);
      }
    };

    getSeats();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    const selectedClassId = classInfo.find(
      (classDetails) => classDetails.name === selectedClass
    )._id;
    setReservationData({
      ...reservationData,
      selectedClassId,
    });
    navigate("/seat-selection");
  };

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          
          {/* <div className="p-6 mb-6 bg-purple-500 rounded-lg shadow-md bg-opacity-90">
            <h2 className="mb-2 text-3xl font-bold text-center ">
              Trip Details
            </h2>
            <div><h6 className="mb-2 text-xl text-black ">
              <p>
                <strong>Departure :</strong>{" "}
                {scheduleInfo.fromHalt.stationRef.name}
              </p>
              <p>
                <strong>Arrival Station :</strong>{" "}
                {scheduleInfo.toHalt.stationRef.name}
              </p>
              <p>
                <strong>Departure Date :</strong> {departureDate}
              </p>
              <p>
                <strong>Passenger :</strong> {pax}
              </p></h6>
            </div>
          </div> */}



<div className="p-6 mb-6 text-gray-700 bg-blue-200 rounded-lg shadow-md bg-opacity-90">
    <h1 className="mb-2 text-3xl font-extrabold text-center text-gray-900">
        Trip Details
    </h1>
    <div className="space-y-2">
        <div className="flex items-center ">
            <MdLocationOn className="mr-2 text-2xl"/>
            <span className="mb-1 text-xl"><strong>Departure:</strong> {scheduleInfo.fromHalt.stationRef.name}</span>
        </div>
        <div className="flex items-center ">
            <MdLocationOn className="mr-2 text-2xl"/>
            <span className="mb-1 text-xl"><strong>Arrival Station:</strong> {scheduleInfo.toHalt.stationRef.name}</span>
        </div>
        <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-2xl"/>
            <span className="mb-1 text-xl"><strong>Departure Date:</strong> {departureDate}</span>
        </div>
        <div className="flex items-center">
            <FaUserFriends className="mr-2 text-2xl"/>
            <span className="text-xl"><strong>Passengers:</strong> {pax}</span>
        </div>
    </div>
</div>

          <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-center">
              <h2 className="mb-4 text-4xl font-extrabold text-center">
                Select Class
              </h2>{" "}
            </div>
            <div className="flex flex-col justify-center md:flex-row md:space-x-14">
              {classInfo.map((classDetails) => (
                <SeatOption
                  key={classDetails._id}
                  wagonClassName={classDetails.name}
                  availableSeats={classDetails.availableSeats}
                  price={
                    classDetails.fareMultiplier *
                    (scheduleInfo.toHalt.price - scheduleInfo.fromHalt.price)
                  }
                  features={classDetails.features}
                  isDisabled={classDetails.availableSeats < pax}
                  isSelected={selectedClass === classDetails.name}
                  onSelect={() => setSelectedClass(classDetails.name)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-gray-700 transition duration-300 bg-gray-300 rounded-full hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className={`bg-purple-900 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 ${
                !selectedClass ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedClass}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Options;
