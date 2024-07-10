// url is like http://localhost:5173/results?departureStationId=Maradana&arrivalStationId=Beliaththa&departureDate=2024-06-24&pax=1
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../components/Filter";
import TrainOption from "../components/TrainOption";
import { ReservationContext } from "../context/ReservationContext";
import useTrainOptions from "../hooks/useTrainOptions";
import SearchForm from "../components/SearchForm";

const Results = () => {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const departureStationId =
    reservationData.departureStationId || queryParams.get("departureStationId");
  const arrivalStationId =
    reservationData.arrivalStationId || queryParams.get("arrivalStationId");
  const departureDate =
    reservationData.departureDate || queryParams.get("departureDate");
  const pax = reservationData.pax || parseInt(queryParams.get("pax"), 10);

  const { trainOptions, loading, error } = useTrainOptions({
    departureStationId,
    arrivalStationId,
    departureDate,
    pax,
  });
  console.log("reservato data: ",reservationData)

  useEffect(() => {
    setReservationData({
      ...reservationData,
      departureStationId,
      arrivalStationId,
      departureDate,
      pax,
    });
  }, [
    departureStationId,
    arrivalStationId,
    departureDate,
    pax,
    setReservationData,
  ]);

  useEffect(() => {
    console.log(
      reservationData.departureStationId,
      reservationData.arrivalStationId,
      reservationData.departureDate,
      reservationData.pax,
      reservationData.seatAvailability,
      reservationData.selectedClass,
      reservationData.departureTime,
      reservationData.arrivalTime,
      reservationData.passengers,
      reservationData.email
    );
  }, [reservationData]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFilterVisible(false);
      } else {
        setIsFilterVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isFilterVisible]);

  const handleTrainOptionClick = (option) => {
    setReservationData({
      ...reservationData,
      scheduleId: option.id,
      fromHaltId: option.fromHalt.id,
      toHaltId: option.toHalt.id,
    });
    const newUrl = `/options?scheduleId=${option.id}&fromHaltId=${option.fromHalt.id}&toHaltId=${option.toHalt.id}&departureDate=${departureDate}&pax=${pax}`;
    navigate(newUrl);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row lg:px-20">
		
        <div
          className={`flex-1 w-full p-4 ${
            isFilterVisible ? "block" : "hidden"
          } md:block`}
        >
          <Filter />
          <button
            onClick={() => setIsFilterVisible(false)}
            className="md:hidden w-fit px-4 py-2 mt-2 border-black border-2 rounded-md"
          >
            Close
          </button>
        </div>
        <button
          onClick={() => setIsFilterVisible(true)}
          className="md:hidden w-fit px-4 py-2 mb-2 border-black border-2 rounded-md"
        >
          Filters
        </button>
        <div className="flex flex-col flex-[3] ml-0">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            trainOptions.map((option) => (
              <TrainOption
                key={option.id}
                option={option}
                onClick={() => handleTrainOptionClick(option)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
