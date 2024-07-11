import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";

import { ReservationContext } from "../context/ReservationContext";
import Wagon from "./Wagon";
import SeatSelectionDispaly from "./SeatSelectionDisplay";


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
  const [wagonsData, setWagonsData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [Maxpax, setMaxpax] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SamplePrevArrow />,
    afterchange: (index) => {
      setSelectedWagon(wagonsData[index]);
    },
  };
  console.log("selectedSeats", selectedSeats);

  const handleSeatClick = (seat, wagonNumber) => {
    const isAvailable = selectedSeats.find(
      (selectedSeat) => selectedSeat._id === seat._id
    );
    if (isAvailable) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat._id !== seat._id)
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        { _id: seat._id, name: seat.name, wagonNumber },
      ]);
    }
  };

  useEffect(() => {
    const getSeats = async () => {
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
      } catch (error) {
        console.error(error);
      }
    };

    getSeats();
  }, [fromHaltId, toHaltId, scheduleId, departureDate, setReservationData]);
  console.log("Wagons Data", wagonsData);

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100"> */}
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
              />
            </div>
          ))}
        </Slider>
        <div className="w-1/2 mx-auto mt-8">
          <SeatSelectionDispaly
            selectedSeats={selectedSeats}
          ></SeatSelectionDispaly> 
          </div>
          
      </div>
      
    </>
  );
};

export default SeatSelectionPage;
