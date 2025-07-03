const FocusCard = ({ area, goal, icon }) => {
  const areaColors = {
    fitness: 'bg-blue-50 border-blue-200',
    nutrition: 'bg-green-50 border-green-200',
    mindset: 'bg-purple-50 border-purple-200',
    finance: 'bg-yellow-50 border-yellow-200'
  };

  return (
    <div className={`focus-card p-4 rounded-lg border ${areaColors[area]} transition-transform hover:scale-[1.02]`}>
      <div className="flex items-center mb-3">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className="font-semibold text-lg capitalize">{area}</h3>
      </div>
      <p className="text-gray-600 pl-11">{goal}</p>
    </div>
  );
};

export default FocusCard;