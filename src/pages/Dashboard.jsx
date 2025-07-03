import { useState, useEffect } from 'react';
import { 
  FiActivity, 
  FiTarget, 
  FiTrendingUp, 
  FiAward,
  FiCheck,
  FiClock,
  FiBarChart2,
  FiCalendar,
  FiChevronRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [programProgress, setProgramProgress] = useState({
    weeksCompleted: 2,
    totalWeeks: 8,
    dailyCompletion: 82
  });
  const [activeTab, setActiveTab] = useState('habits');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { 
      icon: <FiActivity className="w-6 h-6 text-amber-500" />, 
      title: "Current Streak", 
      value: `${currentStreak} days`,
      change: "+3",
      chart: "up"
    },
    { 
      icon: <FiTarget className="w-6 h-6 text-emerald-500" />, 
      title: "Program Progress", 
      value: `${programProgress.weeksCompleted}/${programProgress.totalWeeks} weeks`,
      change: "+1",
      chart: "up"
    },
    { 
      icon: <FiTrendingUp className="w-6 h-6 text-blue-500" />, 
      title: "Daily Completion", 
      value: `${programProgress.dailyCompletion}%`,
      change: "+12%",
      chart: "up"
    },
    { 
      icon: <FiAward className="w-6 h-6 text-purple-500" />, 
      title: "Points Earned", 
      value: "2,850",
      change: "+420",
      chart: "up"
    }
  ];

  const dailyHabits = [
    { 
      name: "Morning Meditation", 
      completed: true,
      time: "7:00 AM",
      duration: "15 min",
      streak: 12
    },
    { 
      name: "Workout Session", 
      completed: true,
      time: "8:30 AM",
      duration: "45 min",
      streak: 7
    },
    { 
      name: "Deep Work Block", 
      completed: false,
      time: "10:00 AM",
      duration: "90 min",
      streak: 5
    },
    { 
      name: "Evening Journal", 
      completed: false,
      time: "9:00 PM",
      duration: "10 min",
      streak: 3
    }
  ];

  const weeklyStats = [
    { name: "Productivity", value: 87, change: "+8%", icon: <FiBarChart2 /> },
    { name: "Energy", value: 76, change: "+12%", icon: <FiActivity /> },
    { name: "Focus", value: 82, change: "+5%", icon: <FiTarget /> },
    { name: "Mindfulness", value: 68, change: "+15%", icon: <FiTrendingUp /> }
  ];

  const upcomingSessions = [
    { title: "Mindset Coaching", time: "Tomorrow, 9:00 AM", coach: "Dr. Sarah Lin" },
    { title: "Fitness Assessment", time: "Friday, 4:30 PM", coach: "Mark Johnson" },
    { title: "Nutrition Review", time: "Next Monday, 11:00 AM", coach: "Alex Chen" }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's your progress</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-medium">
              JS
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex justify-between">
              <div className="p-3 bg-gray-50 rounded-lg">
                {metric.icon}
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${metric.chart === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {metric.change}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">{metric.value}</h3>
            <p className="text-sm text-gray-500">{metric.title}</p>
            <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, 70 + index * 10)}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Program Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">8-Week Transformation</h2>
              <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Week {programProgress.weeksCompleted}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.round((programProgress.weeksCompleted/programProgress.totalWeeks)*100)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${(programProgress.weeksCompleted/programProgress.totalWeeks)*100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-8 gap-2 mt-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-3 h-3 rounded-full mb-1 ${i < programProgress.weeksCompleted ? 'bg-amber-500' : 'bg-gray-200'}`}
                  />
                  <span className="text-xs text-gray-400">W{i+1}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('habits')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'habits' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Daily Habits
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'stats' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Weekly Stats
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'habits' ? (
                  <motion.div
                    key="habits"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {dailyHabits.map((habit, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -2 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <button 
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${habit.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-400'}`}
                            onClick={() => {
                              // Toggle habit completion
                              const updatedHabits = [...dailyHabits];
                              updatedHabits[index].completed = !updatedHabits[index].completed;
                              // In real app, update state
                            }}
                          >
                            {habit.completed && <FiCheck className="w-4 h-4" />}
                          </button>
                          <div>
                            <h4 className={`font-medium ${habit.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                              {habit.name}
                            </h4>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <FiClock className="mr-1" />
                              <span>{habit.time} • {habit.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full mr-3">
                            {habit.streak} day streak
                          </span>
                          <FiChevronRight className="text-gray-400" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {weeklyStats.map((stat, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <div className="flex items-center">
                            <span className="mr-2">{stat.icon}</span>
                            <span>{stat.name}</span>
                          </div>
                          <span className={`font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                            {stat.change}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.value}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Weekly Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-amber-100 rounded-lg mr-3">
                <FiTarget className="text-amber-600 w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Weekly Focus</h3>
            </div>
            <h4 className="font-medium text-amber-800 mb-2">Mindset Foundation</h4>
            <p className="text-sm text-amber-700 mb-4">
              Daily visualization exercises and breathwork sessions to build mental resilience.
            </p>
            <div className="flex space-x-2">
              <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">3/7 days</span>
              <span className="text-xs bg-white text-amber-800 px-2 py-1 rounded-full">+12% from last week</span>
            </div>
          </motion.div>

          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
              <button className="text-sm text-amber-600 hover:text-amber-700">View All</button>
            </div>
            
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="p-2 bg-blue-50 rounded-lg mr-3">
                    <FiCalendar className="text-blue-500 w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{session.title}</h4>
                    <p className="text-sm text-gray-500">{session.time}</p>
                    <p className="text-xs text-gray-400 mt-1">With {session.coach}</p>
                  </div>
                  <FiChevronRight className="text-gray-400 ml-2" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <FiAward className="text-purple-600 w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">New Achievement!</h3>
            </div>
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                🏆
              </div>
              <h4 className="font-medium text-purple-800 mb-1">7-Day Streak Master</h4>
              <p className="text-sm text-purple-700">You've completed all daily habits for 7 straight days!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}