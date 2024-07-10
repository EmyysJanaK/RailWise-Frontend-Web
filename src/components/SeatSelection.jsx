import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";

import { ReservationContext } from "../context/ReservationContext";
import Wagon from "./Wagon";
// import SeatSelectionDispaly from "./SeatSelectionDisplay";




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
  } = reservationData;
  const [wagonsData, setWagonsData] = useState([]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log("reservationData", reservationData);
  console.log("selecte")

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
  console.log("Wagons Data", wagonsData)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* <Slider {...settings}> */}

      {wagonsData.map((wagonData) =>(
        <div key={wagonData._id}>
         <Wagon  wagonNumber={wagonData.wagonNumber} seats={wagonData.seats} bookedSeats={wagonData.alreadyBookedSeats} />
         </div>
      )) }
      {/* </Slider> */}
      {/* <SeatSelectionDispaly /> */}

    </div>

  );
};

export default SeatSelectionPage;
