import { useState } from "react";

export default function Filter() {
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
}
