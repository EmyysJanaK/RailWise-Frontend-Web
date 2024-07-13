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
      style={{ ...style, background: "red", borderRadius: "50%" }}
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
      const response = await axios.post("/api/bookings/createPendingBooking", {
        scheduleId,
        date: departureDate,
        fromHaltId,
        toHaltId,
        selectedSeatIds: selectedSeats.map((seat) => seat._id),
        selectedClassId,
        userId,
      });
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
      <h1 className="mb-8 text-3xl font-extrabold text-center text-gray-900">
        Seat Selection and Email
      </h1>
      <div className="w-[500px] mx-auto mt-8">
        <Slider {...settings}>
          {wagonsData.map((wagonData) => (
            <div key={wagonData._id} className="p-10 bg-red-600">
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
        <button
          className={`w-1/2 p-2 mx-auto mt-8 text-white rounded-lg ${
            disableSlider
              ? "bg-blue-500 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => handleProceed(selectedSeats)}
          disabled={selectedSeats.length < pax}
        >
          Proceed to payment
        </button>
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Enter Email for Ticket</h2>
        <div className="mb-4">
          <input
            type="email"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default SeatSelectionPage;
