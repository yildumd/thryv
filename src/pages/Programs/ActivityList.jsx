import { useEffect, useState } from 'react';

const ActivityList = ({ activities, completed = [], onComplete }) => {
  const [localCompleted, setLocalCompleted] = useState(completed);

  useEffect(() => {
    setLocalCompleted(completed);
  }, [completed]);

  const handleToggle = (index) => {
    const newCompleted = [...localCompleted];
    newCompleted[index] = !newCompleted[index];
    setLocalCompleted(newCompleted);
    onComplete(index);
  };

  return (
    <div className="activity-list bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-4">Weekly Activities</h3>
      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center group">
            <button
              onClick={() => handleToggle(index)}
              className={`w-6 h-6 rounded mr-3 flex items-center justify-center transition-colors ${
                localCompleted[index]
                  ? 'bg-green-500 text-white'
                  : 'border-2 border-gray-300 hover:border-blue-500'
              }`}
            >
              {localCompleted[index] && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span className={`flex-1 ${localCompleted[index] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {activity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;