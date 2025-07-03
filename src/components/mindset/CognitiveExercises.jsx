import { useState } from 'react';

const CognitiveExercises = ({ types = ['dual-n-back', 'memory-grid'] }) => {
  const [activeExercise, setActiveExercise] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Cognitive Exercises</h3>
      <div className="space-y-4">
        {types.map((type) => (
          <div 
            key={type} 
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => setActiveExercise(type)}
          >
            <h4 className="font-medium capitalize">{type.replace('-', ' ')}</h4>
            <p className="text-sm text-gray-500">
              {type === 'dual-n-back' 
                ? 'Improves working memory and fluid intelligence' 
                : 'Enhances visual memory and pattern recognition'}
            </p>
          </div>
        ))}
      </div>
      {activeExercise && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p>{activeExercise} exercise coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default CognitiveExercises;  // Must use default export