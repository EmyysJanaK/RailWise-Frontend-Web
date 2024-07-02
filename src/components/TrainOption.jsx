import PropTypes from 'prop-types';
import { useEffect } from 'react';

const TrainOption = ({ option, onClick }) => {
  useEffect(() => {
    console.log('TrainOption rendered');
  }, []);

  return (
    <div
      className="border border-gray-300 p-4 mb-4 flex justify-between bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between w-full items-center">
        <div className="text-lg font-bold">
          <span>{option.departure} → {option.arrival}</span>
        </div>
        <div className="text-gray-600">
          <span>{option.duration} · {option.changes} changes</span>
        </div>
        <div className="bg-gray-100 px-4 py-2 w-24 text-center font-bold text-gray-800">
          <span>from ${option.price}</span>
        </div>
      </div>
    </div>
  );
};

TrainOption.propTypes = {
  option: PropTypes.shape({
    departure: PropTypes.string.isRequired,
    arrival: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    changes: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TrainOption;
