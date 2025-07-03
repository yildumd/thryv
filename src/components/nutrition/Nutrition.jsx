import MealPlanner from './MealPlanner';
import MacroTracker from './MacroTracker';
import RecipeDatabase from './RecipeDatabase';

const Nutrition = () => {
  // Default macro goals - customize as needed
  const macroGoals = {
    protein: 150,
    carbs: 200,
    fats: 50
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nutrition Module</h1>
      <MealPlanner />
      <MacroTracker 
        goals={macroGoals} 
        waterReminder={true} 
      />
      <RecipeDatabase />
    </div>
  );
};

export default Nutrition;