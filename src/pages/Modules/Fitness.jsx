import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const Fitness = () => {
  const [workoutPlan, setWorkoutPlan] = useState(() => {
    const saved = localStorage.getItem('fitnessWorkouts');
    return saved ? JSON.parse(saved) : [
      { id: 1, day: 'Monday', activity: 'Strength Training', completed: true },
      { id: 2, day: 'Tuesday', activity: 'HIIT Circuit', completed: true },
      { id: 3, day: 'Wednesday', activity: 'Yoga/Recovery', completed: false },
      { id: 4, day: 'Thursday', activity: 'Strength Training', completed: false },
      { id: 5, day: 'Friday', activity: 'Sprint Intervals', completed: false },
      { id: 6, day: 'Saturday', activity: 'Active Recovery', completed: false },
      { id: 7, day: 'Sunday', activity: 'Rest Day', completed: false }
    ];
  });

  const [newExercise, setNewExercise] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('fitnessWorkouts', JSON.stringify(workoutPlan));
  }, [workoutPlan]);

  const toggleCompletion = (id) => {
    setWorkoutPlan(prevPlan => 
      prevPlan.map(workout => 
        workout.id === id ? { ...workout, completed: !workout.completed } : workout
      )
    );
  };

  const handleInputChange = (e) => {
    setNewExercise(e.target.value);
  };

  const addCustomExercise = () => {
    if (newExercise.trim()) {
      setWorkoutPlan(prevPlan => [
        ...prevPlan,
        {
          id: Date.now(),
          day: 'Custom',
          activity: newExercise.trim(),
          completed: false
        }
      ]);
      setNewExercise('');
      setShowAddForm(false);
    }
  };

  const removeExercise = (id) => {
    setWorkoutPlan(prevPlan => prevPlan.filter(w => w.id !== id));
  };

  return (
    <div className="space-y-8">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900"
      >
        Fitness Mastery
      </motion.h2>

      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Your Workout Plan</h3>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            aria-label="Add exercise"
          >
            <FiPlus /> Add Exercise
          </button>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newExercise}
                  onChange={handleInputChange}
                  placeholder="Enter custom exercise"
                  className="flex-1 p-2 border rounded"
                  aria-label="Exercise name"
                />
                <button 
                  onClick={addCustomExercise}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={!newExercise.trim()}
                >
                  Add
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="space-y-2">
          <AnimatePresence>
            {workoutPlan.map((workout) => (
              <motion.li
                key={workout.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleCompletion(workout.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      workout.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'border border-gray-300 text-transparent'
                    }`}
                    aria-label={workout.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {workout.completed && '✓'}
                  </button>
                  <div>
                    <span className={`font-medium ${
                      workout.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                    }`}>
                      {workout.day}: {workout.activity}
                    </span>
                  </div>
                </div>
                {workout.day === 'Custom' && (
                  <button 
                    onClick={() => removeExercise(workout.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove exercise"
                  >
                    Remove
                  </button>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </div>
  );
};

export default Fitness;