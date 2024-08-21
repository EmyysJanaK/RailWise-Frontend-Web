// import  { useState } from 'react';

// const Filter = () => {
//     const [selectedClass, setSelectedClass] = useState('all');
//     const [selectedFeatures, setSelectedFeatures] = useState([]);

//     // const classes = ['all', '1st Class', '2nd Class', '3rd Class'];
//     const features = ['Express', 'Slow'];

//     // const handleClassChange = (event) => {
//     //     setSelectedClass(event.target.value);
//     // };

//     const handleFeatureChange = (event) => {
//         const feature = event.target.value;
//         setSelectedFeatures((prevSelectedFeatures) =>
//             prevSelectedFeatures.includes(feature)
//                 ? prevSelectedFeatures.filter((f) => f !== feature)
//                 : [...prevSelectedFeatures, feature]
//         );
//     };

//     return (
//         <div className="w-full p-4 pl-10 bg-purple-800 border h-fit">
//             <h3 className="mb-4 text-2xl font-semibold">Filters</h3>

//             <div>
//                 <h4 className="mb-2 font-semibold">Features</h4>
//                 <ul>
//                     {features.map((feature) => (
//                         <li key={feature} className="mb-1">
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     value={feature}
//                                     checked={selectedFeatures.includes(feature)}
//                                     onChange={handleFeatureChange}
//                                     className="mr-2"
//                                 />
//                                 {feature}
//                             </label>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Filter;

import { useState } from "react";

const Filter = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const features = ["Express", "Slow"];

  const handleFeatureChange = (event) => {
    const feature = event.target.value;
    setSelectedFeatures((prevSelectedFeatures) =>
      prevSelectedFeatures.includes(feature)
        ? prevSelectedFeatures.filter((f) => f !== feature)
        : [...prevSelectedFeatures, feature]
    );
  };

  return (
    <div className="w-full p-6 text-gray-700 bg-blue-100 rounded-lg shadow-md h-fit">
      <h3 className="mb-4 text-2xl font-semibold">Filters</h3>

      <div>
        <ul>
          {features.map((feature) => (
            <li key={feature} className="mb-2">
              <label className="flex items-center text-lg font-bold cursor-pointer">
                <input
                  type="checkbox"
                  value={feature}
                  checked={selectedFeatures.includes(feature)}
                  onChange={handleFeatureChange}
                  className="w-5 h-5 text-purple-400 rounded form-checkbox focus:ring-0"
                />
                <span className="ml-2">{feature}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
