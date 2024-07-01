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
      className={`p-4 border rounded-lg cursor-pointer ${isSelected ? 'border-blue-500' : 'border-gray-300'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={!isDisabled ? onSelect : null}
    >
      <h3 className="font-bold text-lg">{className}</h3>
      <p className="text-lg font-semibold">${price.toFixed(2)}</p>
      <p className="text-sm text-gray-700">Available seats: {seats}</p>
      <ul className="mt-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>
            {feature}
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
