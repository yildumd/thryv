import { useState } from 'react';

const MacroTracker = ({ goals, waterReminder }) => {
  const [intake, setIntake] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
    water: 0
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Macro Tracker</h3>
      <div className="space-y-4">
        {Object.keys(goals).map((macro) => (
          <div key={macro}>
            <div className="flex justify-between mb-1">
              <span className="capitalize">{macro}</span>
              <span>{intake[macro]}/{goals[macro]}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (intake[macro]/goals[macro])*100)}%` }}
              ></div>
            </div>
          </div>
        ))}
        {waterReminder && (
          <div>
            <p className="mb-1">Water: {intake.water}/8 glasses</p>
            <div className="flex gap-2">
              {[...Array(8)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setIntake({...intake, water: i+1})}
                  className={`w-6 h-6 rounded-full ${i < intake.water ? 'bg-blue-500' : 'bg-blue-100'}`}
                ></button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroTracker; // Changed to default export