import PropTypes from "prop-types";

const SeatOption = ({ className, seats, isDisabled, isSelected, onSelect }) => {
  const seatDetails = {
    "1st Class": { price: 174, features: ["Free WiFi", "Power outlets"] },
    "2nd Class": { price: 194, features: ["Free WiFi", "Power outlets", "Free drinks"] },
    "3rd Class": { price: 214, features: ["Free WiFi", "Power outlets", "Free drinks", "Wide seats"] },
  };

  const { price, features } = seatDetails[className];

  return (
    <div
      className={`p-8 border-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105
         ${isSelected ? 'border-blue-500 bg-blue-100' : 'border-purple-500 bg-white' } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-500'}`}
      onClick={!isDisabled ? onSelect : null}
    >
      <h3 className="font-bold text-3xl mb-4 text-black-900 text-center">{className}</h3>
      <p className="text-3xl font-semibold text-gray-700 text-center">${price.toFixed(2)}</p>
      <p className="text-3xl font-semibold text-gray-700 mt-2 text-center">Available seats: {seats}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center justify-center">
            <span className="text-green-500 mr-2">✔</span>
            <span className="text-lg text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

SeatOption.propTypes = {
  className: PropTypes.string.isRequired,
  seats: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SeatOption;
