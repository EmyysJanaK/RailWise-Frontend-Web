import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import TrainOption from "../components/TrainOption";
import { ReservationContext } from "../context/ReservationContext";
import useTrainOptions from "../hooks/useTrainOptions";

export default function Results() {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);

  const navigate = useNavigate();

  const { departureStationId, arrivalStationId, departureDate } =
    reservationData;

  const { trainOptions, loading, error } = useTrainOptions({
    departureStationId,
    arrivalStationId,
    departureDate,
  });

  const handleTrainOptionClick = (option) => {
    setReservationData({
      ...reservationData,
      scheduleId: option.id,
      fromHaltId: option.fromHalt.id,
      toHaltId: option.toHalt.id,
      trainId: option.train.id,
    });
    navigate("/options");
  };

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row lg:px-20 ml:6">
        <div className={`flex-1 w-full p-1 `}>
          <Filter />
        </div>

        <div className="flex-1 flex flex-col gap-4 ml-0 md:ml-8 lg:flex-[3]">
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
}
