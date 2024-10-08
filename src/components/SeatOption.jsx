import PropTypes from "prop-types";

const SeatOption = ({ wagonClassName, availableSeats, price, features, isDisabled, isSelected, onSelect }) => {

  return (
    <div
      className={`p-8 border-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105
         ${isSelected ? 'border-purple-900 bg-blue-100' : 'border-purple-900 bg-white' } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-500'}`}
      onClick={!isDisabled ? onSelect : null}
    >
      <h3 className="mb-4 text-3xl font-bold text-center text-black-900">{wagonClassName.toUpperCase()}</h3>
      <p className="text-3xl font-semibold text-center text-gray-700">LKR {price}</p>
      <p className="mt-2 text-3xl font-semibold text-center text-gray-700">Available seats: {availableSeats}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center justify-center">
            <span className="mr-2 text-green-500">✔</span>
            <span className="text-lg text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

SeatOption.propTypes = {
  wagonClassName: PropTypes.string.isRequired,
  availableSeats: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SeatOption;
