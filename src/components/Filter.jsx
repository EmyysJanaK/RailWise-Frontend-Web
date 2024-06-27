import  { useState } from 'react';

const Filter = () => {
    const [selectedClass, setSelectedClass] = useState('2nd Class');
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const classes = ['2nd Class', 'Premium', '1st Class', 'VIP'];
    const features = ['High speed', 'Direct', 'Slower train', 'Overnight'];

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleFeatureChange = (event) => {
        const feature = event.target.value;
        setSelectedFeatures((prevSelectedFeatures) => 
            prevSelectedFeatures.includes(feature)
                ? prevSelectedFeatures.filter((f) => f !== feature)
                : [...prevSelectedFeatures, feature]
        );
    };

    return (
        <div className="border p-4 pl-10 bg-gray-100">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Classes</h4>
                <ul>
                    {classes.map((className) => (
                        <li key={className} className="mb-1">
                            <label>
                                <input
                                    type="radio"
                                    value={className}
                                    checked={selectedClass === className}
                                    onChange={handleClassChange}
                                    className="mr-2"
                                />
                                {className}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul>
                    {features.map((feature) => (
                        <li key={feature} className="mb-1">
                            <label>
                                <input
                                    type="checkbox"
                                    value={feature}
                                    checked={selectedFeatures.includes(feature)}
                                    onChange={handleFeatureChange}
                                    className="mr-2"
                                />
                                {feature}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Filter;
