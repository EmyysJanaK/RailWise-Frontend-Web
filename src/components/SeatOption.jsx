import PropTypes from "prop-types";

const SeatOption = ({ className, seats, isDisabled, isSelected, onSelect }) => {
  const seatDetails = {
    "2nd Class": { price: 174, features: ["Free WiFi", "Power outlets"] },
    Premium: { price: 194, features: ["Free WiFi", "Power outlets", "Free drinks"] },
    "1st Class": { price: 214, features: ["Free WiFi", "Power outlets", "Free drinks", "Wide seats"] },
    VIP: { price: 234, features: ["Free WiFi", "Power outlets", "Free drinks", "Wide seats"] },
  };

  const { price, features } = seatDetails[className];

  return (
    <div
      className={`p-6 border-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 ${
        isSelected ? 'border-blue-500 bg-blue-100' : 'border-purple-500 bg-white'
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-500'}`}
      onClick={!isDisabled ? onSelect : null}
    >
      <h3 className="font-bold text-xl mb-2 text-purple-900">{className}</h3>
      <p className="text-2xl font-semibold text-black-600">${price.toFixed(2)}</p>
      <p className="text-2x1 font-semibold text-black-600 mt-1">Available seats: {seats}</p>
      <ul className="mt-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <span className="text-green-500 mr-2">✔</span>
            <span className="text-gray-800">{feature}</span>
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
