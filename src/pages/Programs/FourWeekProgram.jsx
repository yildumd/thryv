import { useState } from 'react';
import WeekSelector from './WeekSelector'; // Reuse the same component
import FocusCard from './FocusCard';       // Reuse the same component
import ActivityList from './ActivityList'; // Reuse the same component

const areaIcons = {
  fitness: '💪',
  nutrition: '🥗',
  mindset: '🧘',
  finance: '💰'
};

// 4-week condensed program data
const weeklyThemes = [
  {
    title: "Quick Start Week",
    focus: {
      fitness: "3 full-body workouts",
      nutrition: "Hydration focus",
      mindset: "5-min daily meditation",
      finance: "Spending audit"
    },
    activities: [
      "Complete 3 workout sessions",
      "Drink 2L water daily",
      "Morning meditation",
      "Track all expenses"
    ]
  },
  {
    title: "Habit Formation",
    focus: {
      fitness: "Increase intensity",
      nutrition: "Protein targets",
      mindset: "Gratitude practice",
      finance: "Budget setup"
    },
    activities: [
      "Add 1 more weekly workout",
      "Meet protein goals 5 days",
      "Daily gratitude journal",
      "Create spending plan"
    ]
  },
  {
    title: "Performance Week",
    focus: {
      fitness: "Strength milestones",
      nutrition: "Meal prep",
      mindset: "Visualization",
      finance: "Debt reduction"
    },
    activities: [
      "Hit new personal records",
      "Prep 3 healthy meals",
      "5-min visualization daily",
      "Extra debt payment"
    ]
  },
  {
    title: "Final Push",
    focus: {
      fitness: "Max effort",
      nutrition: "Clean eating",
      mindset: "Confidence boost",
      finance: "Savings goal"
    },
    activities: [
      "Complete fitness challenge",
      "Eliminate processed foods",
      "Positive affirmations",
      "Transfer to savings"
    ]
  }
];

const FourWeekProgram = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [completedActivities, setCompletedActivities] = useState([]);

  const markActivityDone = (activityIndex) => {
    setCompletedActivities(prev => {
      const newCompleted = [...prev];
      newCompleted[currentWeek] = newCompleted[currentWeek] || [];
      newCompleted[currentWeek][activityIndex] = !newCompleted[currentWeek][activityIndex];
      return newCompleted;
    });
  };

  return (
    <div className="program-container p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">4-Week Jumpstart Program</h1>
      
      <WeekSelector 
        weeks={weeklyThemes} 
        current={currentWeek}
        onChange={setCurrentWeek}
        className="mb-10"
      />
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{weeklyThemes[currentWeek].title}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(weeklyThemes[currentWeek].focus).map(([area, goal]) => (
            <FocusCard 
              key={area}
              area={area}
              goal={goal}
              icon={areaIcons[area]}
            />
          ))}
        </div>
        
        <ActivityList 
          activities={weeklyThemes[currentWeek].activities}
          completed={completedActivities[currentWeek] || []}
          onComplete={markActivityDone}
        />
      </div>
      
      <div className="flex justify-between mt-8">
        {currentWeek > 0 && (
          <button 
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Previous Week
          </button>
        )}
        {currentWeek < weeklyThemes.length - 1 && (
          <button 
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
          >
            Next Week
          </button>
        )}
      </div>
    </div>
  );
};

export default FourWeekProgram;