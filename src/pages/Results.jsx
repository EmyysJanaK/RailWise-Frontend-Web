import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import TrainOption from "../components/TrainOption";
import { ReservationContext } from "../context/ReservationContext";
import useTrainOptions from "../hooks/useTrainOptions";
import LoadingModal from "../components/LoadingModal";

export default function Results() {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);

  const [selectedFeatures, setSelectedFeatures] = useState([]);

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

  const filterTrainOptions = () => {
    return trainOptions.filter(
      (option) =>
        selectedFeatures.length === 0 ||
        selectedFeatures.includes(
          option.scheduleType.charAt(0).toUpperCase() +
            option.scheduleType.slice(1)
        )
    );
  };

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row lg:px-20 ml:6">
        {!loading && (
          <div className={`flex-1 w-full p-1 `}>
            <Filter
              selectedFeatures={selectedFeatures}
              setSelectedFeatures={setSelectedFeatures}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col gap-4 ml-0 md:ml-8 lg:flex-[3]">
          {loading ? (
            <LoadingModal />
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            (() => {
              const filteredTrainOptions = filterTrainOptions();

              return filteredTrainOptions.length > 0 ? (
                filteredTrainOptions.map((option) => (
                  <TrainOption
                    key={option.id}
                    option={option}
                    onClick={() => handleTrainOptionClick(option)}
                  />
                ))
              ) : (
                <div className="ml-3 text-2xl font-bold text-gray-700 capitalize">
                  No trains available
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
}
