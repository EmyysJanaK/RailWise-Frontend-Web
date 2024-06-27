import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import TrainOption from "../components/TrainOption";

const Results = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const trainOptions = [
    {
      id: 1,
      departure: "05:54",
      arrival: "15:07",
      duration: "9h 13m",
      changes: 3,
      price: 116,
    },
    {
      id: 2,
      departure: "06:42",
      arrival: "17:07",
      duration: "10h 25m",
      changes: 2,
      price: 71,
    },
    {
      id: 3,
      departure: "07:43",
      arrival: "17:07",
      duration: "9h 24m",
      changes: 3,
      price: 108,
    },
    {
      id: 4,
      departure: "09:07",
      arrival: "18:19",
      duration: "9h 12m",
      changes: 3,
      price: 103,
    },
    {
      id: 5,
      departure: "11:21",
      arrival: "20:19",
      duration: "8h 58m",
      changes: 3,
      price: 106,
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFilterVisible(false);
      }
      console.log(isFilterVisible);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-slate-500 h-48">pp</div>

      <div className="flex flex-col p-4 md:flex-row lg:px-20">
        <div className={`flex-1 w-full p-4 hidden md:flex`}>
          <Filter />
        </div>

        <div className={`md:hidden fixed inset-y-0 left-0 w-64 p-4 bg-white transition-transform transform ${isFilterVisible ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
          <Filter />
          <button onClick={() => setIsFilterVisible(false)} className="md:hidden w-fit px-4 py-2 mt-2 border-black border-2 rounded-md">Close</button>
        </div>

        <button onClick={() => setIsFilterVisible(true)} className="md:hidden md:mb-0 w-fit px-4 py-2 mb-2 border-black border-2 rounded-md">Filters</button>

        <div className="flex flex-col flex-[3] ml-0">
          {trainOptions.map((option) => (
            <TrainOption key={option.id} option={option} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
