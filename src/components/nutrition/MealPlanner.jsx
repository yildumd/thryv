// src/components/nutrition/MealPlanner.jsx
import { useState } from 'react';

const MealPlanner = () => {
  const [meals, setMeals] = useState([
    { day: 'Monday', breakfast: 'Oatmeal', lunch: 'Chicken Salad', dinner: 'Grilled Salmon' },
    // Add other days...
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Weekly Meal Plan</h3>
      <div className="space-y-4">
        {meals.map((meal, index) => (
          <div key={index} className="border-b pb-4">
            <h4 className="font-medium">{meal.day}</h4>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500">Breakfast</p>
                <p>{meal.breakfast}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lunch</p>
                <p>{meal.lunch}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dinner</p>
                <p>{meal.dinner}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner; // Changed to default export