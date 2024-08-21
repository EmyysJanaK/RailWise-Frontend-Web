// url is like http://localhost:5173/results?departureStationId=Maradana&arrivalStationId=Beliaththa&departureDate=2024-06-24&pax=1
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../components/Filter";
import TrainOption from "../components/TrainOption";
import { ReservationContext } from "../context/ReservationContext";
import useTrainOptions from "../hooks/useTrainOptions";
import SearchForm from "../components/SearchForm";

// const Results = () => {
//   const { reservationData, setReservationData } =
//     useContext(ReservationContext);
//   const [isFilterVisible, setIsFilterVisible] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const { departureStationId, arrivalStationId, departureDate } =
//     reservationData;

//   const { trainOptions, loading, error } = useTrainOptions({
//     departureStationId,
//     arrivalStationId,
//     departureDate,
//   });

//   // useEffect(() => {
//   //   setReservationData({
//   //     ...reservationData,
//   //     departureStationId,
//   //     arrivalStationId,
//   //     departureDate,
//   //     pax,
//   //   });
//   // }, [
//   //   departureStationId,
//   //   arrivalStationId,
//   //   departureDate,
//   //   pax,
//   //   setReservationData,
//   // ]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsFilterVisible(false);
//       } else {
//         setIsFilterVisible(true);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [isFilterVisible]);

//   const handleTrainOptionClick = (option) => {
//     setReservationData({
//       ...reservationData,
//       scheduleId: option.id,
//       fromHaltId: option.fromHalt.id,
//       toHaltId: option.toHalt.id,
//       trainId: option.train.id,
//     });
//     // const newUrl = `/options?scheduleId=${option.id}&fromHaltId=${option.fromHalt.id}&toHaltId=${option.toHalt.id}&departureDate=${departureDate}&pax=${pax}`;
//     navigate("/options");
//   };

//   return (
//     <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
//       <div className="flex flex-col md:flex-row lg:px-20">
//         <div
//           className={`flex-1 w-full p-4 ${
//             isFilterVisible ? "block" : "hidden"
//           } md:block`}
//         >
//           <Filter />
//           <button
//             onClick={() => setIsFilterVisible(false)}
//             className="px-4 py-2 mt-2 border-2 border-black rounded-md md:hidden w-fit"
//           >
//             Close
//           </button>
//         </div>
//         <button
//           onClick={() => setIsFilterVisible(true)}
//           className="px-4 py-2 mb-2 border-2 border-black rounded-md md:hidden w-fit"
//         >
//           Filters
//         </button>
//         <div className="flex flex-col flex-[3] ml-0">
//           {loading ? (
//             <div>Loading...</div>
//           ) : error ? (
//             <div className="text-red-500">{error}</div>
//           ) : (
//             trainOptions.map((option) => (
//               <TrainOption
//                 key={option.id}
//                 option={option}
//                 onClick={() => handleTrainOptionClick(option)}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;


const Results = () => {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

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
        <div
          className={`flex-1 w-full p-1 `}
        >
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
};

export default Results;
