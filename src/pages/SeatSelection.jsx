import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import { ReservationContext } from "../context/ReservationContext";
import { UserContext } from "../context/UserContext";
import Wagon from "../components/Wagon";
import SeatSelectionDispaly from "../components/SeatSelectionDisplay";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,  background: "purple", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

const SeatSelectionPage = () => {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);
  const navigate = useNavigate();
  const {
    scheduleId,
    trainId,
    fromHaltId,
    toHaltId,
    departureDate,
    selectedClassId,
    pax,
  } = reservationData;
  const { userData } = useContext(UserContext);
  const userId = userData ? userData._id : null;
  const [wagonsData, setWagonsData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [disableSlider, setDisableSlider] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    const getSeats = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/schedules/wagonsOfClass", {
          params: {
            scheduleId,
            trainId,
            fromHaltId,
            toHaltId,
            date: departureDate,
            requestedClassId: selectedClassId,
          },
        });
        console.log("response", response.data);
        setWagonsData(response.data.requestedClassWagons);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load seat data");
        setLoading(false);
      }
    };

    getSeats();
  }, [fromHaltId, toHaltId, scheduleId, departureDate, setReservationData]);

  const handleSeatClick = (seat, wagonNumber) => {
    const isAvailable = selectedSeats.find(
      (selectedSeat) => selectedSeat._id === seat._id
    );
    if (isAvailable) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat._id !== seat._id)
      );
    } else {
      if (selectedSeats.length >= pax - 1) {  
        setDisableSlider(true);
      } else {
        setDisableSlider(false);
      }
      setSelectedSeats([
        ...selectedSeats,
        { _id: seat._id, name: seat.name, wagonNumber },
      ]);
    }
  };

  const handleReset = () => {
    setSelectedSeats([]);
    setDisableSlider(false);
  };

  const handleProceed = async (selectedSeats) => {
    setReservationData({
      ...reservationData,
      selectedSeats,
    });
    setLoading(true);
    try {
      const data = {
        scheduleId,
        date: departureDate,
        fromHaltId,
        toHaltId,
        selectedSeatIds: selectedSeats.map((seat) => seat._id),
        selectedClassId,
        userId,
      }
      console.log("data", data);
      const response = await axios.post("/api/bookings/createPendingBooking", data);
      setLoading(false);
      console.log("response", response.data);
      navigate("/payment-gateway", { state: { bookingId: response.data.bookingId, expireTime: response.data.expireTime, email } });
    } catch (error) {
      console.error(error);
      setError("Failed to proceed to payment");
      setLoading(false);
    }
  };

  return (

    <>
    <div className="relative py-24 overflow-hidden bg-gray-700 isolate sm:py-32">
      
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
      <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
    
      <h2 className="mb-8 text-4xl font-extrabold text-center text-white">
        Seat Selection and Email
      </h2>
      <div className="w-[500px] mx-auto mt-8">
        <Slider {...settings}>
          {wagonsData.map((wagonData) => (
            <div key={wagonData._id} className="p-10 bg-gray-700">
              <Wagon
                wagonNumber={wagonData.wagonNumber}
                seats={wagonData.seats}
                bookedSeats={wagonData.alreadyBookedSeats}
                handleSeatClick={handleSeatClick}
                selectedSeats={selectedSeats}
                disableSlider={disableSlider}
              />
            </div>
          ))}
        </Slider>
        <div className="w-1/2 mx-auto mt-8">
          <SeatSelectionDispaly
            selectedSeats={selectedSeats}
            handleReset={handleReset}
          ></SeatSelectionDispaly>
        </div>
        
        
        
        <div className="max-w-lg p-8 mx-auto mb-8 bg-white shadow-lg rounded-xl">
            <h2 className="mb-6 text-2xl font-extrabold text-center text-gray-800">
              Enter Email for Ticket
            </h2>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-3 mt-1 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className={`w-1/2 p-2 mt-8 text-white rounded-lg ${
                  disableSlider
                    ? "bg-purple-900 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={() => handleProceed(selectedSeats)}
                disabled={selectedSeats.length < pax}
              >
                Proceed to payment
              </button>
            </div>
        </div>
          


      </div>
      
    </div>
    </>
  );
};

export default SeatSelectionPage;
