import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiChevronRight, FiAward, FiClock } from 'react-icons/fi';

// Enhanced icon mapping with animations
const areaIcons = {
  fitness: '💪',
  nutrition: '🥗',
  mindset: '🧘',
  finance: '📈'
};

const areaColors = {
  fitness: 'from-orange-500 to-amber-500',
  nutrition: 'from-emerald-500 to-teal-500',
  mindset: 'from-indigo-500 to-purple-500',
  finance: 'from-blue-500 to-cyan-500'
};

// Complete 8-week program data with more details
const weeklyThemes = [
  {
    title: "Foundation Week",
    subtitle: "Building Core Habits",
    focus: {
      fitness: "Establish workout routine (3x/week)",
      nutrition: "Meal prep fundamentals",
      mindset: "Morning meditation practice",
      finance: "Budget creation & tracking"
    },
    activities: [
      { text: "Complete 3 strength workouts", duration: "45 mins/session" },
      { text: "Meal prep 5 healthy lunches", duration: "2 hours" },
      { text: "Daily 10-min meditation", duration: "10 mins/day" },
      { text: "Track all expenses for the week", duration: "30 mins" }
    ],
    quote: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    title: "Building Momentum",
    subtitle: "Increasing Intensity",
    focus: {
      fitness: "Add 10% more weight to lifts",
      nutrition: "Macro tracking & adjustments",
      mindset: "Gratitude journaling practice",
      finance: "Expense analysis & optimization"
    },
    activities: [
      { text: "Increase weights in all exercises", duration: "50 mins/session" },
      { text: "Track macros for 5 consecutive days", duration: "Daily" },
      { text: "Write 3 gratitude entries daily", duration: "10 mins/day" },
      { text: "Identify and fix 3 spending leaks", duration: "1 hour" }
    ],
    quote: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun"
  },
  {
    title: "Week 8: Transformation",
    subtitle: "Peak Performance",
    focus: {
      fitness: "Final fitness assessment",
      nutrition: "Sustainable eating habits",
      mindset: "Confidence reinforcement",
      finance: "Long-term investment planning"
    },
    activities: [
      { text: "Complete final fitness tests", duration: "1 hour" },
      { text: "Establish maintenance meal plan", duration: "2 hours" },
      { text: "Daily positive affirmations", duration: "5 mins/day" },
      { text: "Set up automated investments", duration: "1 hour" }
    ],
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  }
];

const ProgressRing = ({ progress, radius = 40, stroke = 6 }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
      <circle
        stroke="currentColor"
        className="text-gray-200"
        strokeWidth={stroke}
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="currentColor"
        className="text-amber-500"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const EightWeekProgram = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [completedActivities, setCompletedActivities] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  // Calculate overall progress
useEffect(() => {
  const totalActivities = weeklyThemes.reduce((sum, week, index) => {
    return sum + ((completedActivities[index] || []).filter(Boolean).length);
  }, 0);
  
  const totalPossible = weeklyThemes.reduce((sum, week) => sum + week.activities.length, 0);
  const progress = totalPossible > 0 ? Math.round((totalActivities / totalPossible) * 100) : 0;
  setOverallProgress(progress);

  // Show celebration when reaching 100%
  if (progress === 100 && totalPossible > 0) {
    setShowCelebration(true);
    const timer = setTimeout(() => setShowCelebration(false), 3000);
    return () => clearTimeout(timer);
  }
}, [completedActivities]);

const markActivityDone = (activityIndex) => {
  setCompletedActivities(prev => {
    const newCompleted = [...prev];
    newCompleted[currentWeek] = newCompleted[currentWeek] || [];
    newCompleted[currentWeek][activityIndex] = !newCompleted[currentWeek][activityIndex];
    return newCompleted;
  });
};

const weekProgress = weeklyThemes[currentWeek].activities.length > 0 
  ? Math.round(
      ((completedActivities[currentWeek] || []).filter(Boolean).length / 
      weeklyThemes[currentWeek].activities.length) * 100
    )
  : 0;

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
    {/* Celebration Animation */}
    <AnimatePresence>
      {showCelebration && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center"
            >
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Program Complete!</h2>
              <p className="text-gray-600 mb-6">Congratulations on finishing your 8-week transformation journey!</p>
              <button 
                onClick={() => setShowCelebration(false)}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                View Results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Header with Progress */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">8-Week Transformation</h1>
            <p className="text-gray-600">Your personalized journey to peak performance</p>
          </div>
          
          <div className="flex items-center">
            <div className="relative mr-4">
              <ProgressRing progress={overallProgress} radius={32} stroke={4} />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                {overallProgress}%
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="font-medium">
                {completedActivities.flat().filter(Boolean).length}/{weeklyThemes.reduce((sum, week) => sum + week.activities.length, 0)} tasks
              </p>
            </div>
          </div>
        </motion.div>

        {/* Week Selector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex space-x-2">
              {weeklyThemes.map((week, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWeek(index)}
                  className={`px-4 py-2 rounded-lg flex flex-col items-center min-w-[120px] transition-all relative ${currentWeek === index 
                    ? 'bg-white shadow-md border border-gray-200' 
                    : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <span className={`font-medium ${currentWeek === index ? 'text-amber-600' : 'text-gray-700'}`}>
                    Week {index + 1}
                  </span>
                  <span className="text-xs text-gray-500">{week.title.split(':')[0]}</span>
                  {((completedActivities[index] || []).filter(Boolean).length || 0) > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Current Week Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWeek}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {weeklyThemes[currentWeek].title}
                </h2>
                <p className="text-lg text-gray-600">
                  {weeklyThemes[currentWeek].subtitle}
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="relative mr-3">
                  <ProgressRing progress={weekProgress} radius={24} stroke={3} />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    {weekProgress}%
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Week Progress</p>
                  <p className="font-medium text-sm">
                    {((completedActivities[currentWeek] || []).filter(Boolean).length || 0)}/{weeklyThemes[currentWeek].activities.length} tasks
                  </p>
                </div>
              </div>
            </div>

            {/* Weekly Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg"
            >
              <p className="italic text-gray-800">"{weeklyThemes[currentWeek].quote}"</p>
              <p className="text-sm text-amber-800 mt-1">— {weeklyThemes[currentWeek].author}</p>
            </motion.div>

            {/* Focus Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {Object.entries(weeklyThemes[currentWeek].focus).map(([area, goal], index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className={`text-3xl mr-4 bg-gradient-to-br ${areaColors[area]} bg-clip-text text-transparent`}>
                      {areaIcons[area]}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {area}
                      </h3>
                      <p className="text-gray-800">{goal}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Activities List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Activities</h3>
                <p className="text-sm text-gray-500">Complete these tasks to progress</p>
              </div>
              
              <ul className="divide-y divide-gray-100">
                {weeklyThemes[currentWeek].activities.map((activity, index) => {
                  const isCompleted = (completedActivities[currentWeek] || [])[index];
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start">
                        <button
                          onClick={() => markActivityDone(index)}
                          className={`mt-1 mr-4 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${isCompleted 
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-600' 
                            : 'bg-white border-gray-300 hover:border-amber-400'}`}
                        >
                          {isCompleted && <FiCheck className="w-4 h-4" />}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                            {activity.text}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FiClock className="mr-1" />
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                        {isCompleted && (
                          <div className="ml-4 flex-shrink-0">
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                              Completed
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {currentWeek > 0 && (
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 flex items-center"
            >
              Previous Week
            </motion.button>
          )}
          
          {currentWeek < weeklyThemes.length - 1 ? (
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl ml-auto flex items-center"
            >
              Next Week <FiChevronRight className="ml-1" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-lg hover:shadow-xl ml-auto flex items-center"
            >
              Complete Program <FiAward className="ml-2" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EightWeekProgram;