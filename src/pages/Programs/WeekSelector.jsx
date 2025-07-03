import PropTypes from 'prop-types';

const WeekSelector = ({ weeks, current, onChange, className = '' }) => {
  return (
    <div className={`week-selector ${className}`}>
      <div className="flex overflow-x-auto pb-2 gap-2">
        {weeks.map((_, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`px-4 py-2 rounded-full min-w-[100px] transition-all ${
              current === index
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            Week {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

WeekSelector.propTypes = {
  weeks: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default WeekSelector;