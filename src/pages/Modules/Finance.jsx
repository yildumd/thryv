import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiPieChart, FiCreditCard } from 'react-icons/fi';

const Finance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [savings, setSavings] = useState(() => {
    const saved = localStorage.getItem('financeSavings');
    return saved ? JSON.parse(saved) : { target: 5000, current: 2350 };
  });

  const [calculator, setCalculator] = useState({
    principal: 1000,
    rate: 7,
    years: 5,
    monthly: 100
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('financeSavings', JSON.stringify(savings));
  }, [savings]);

  const calculateCompoundInterest = () => {
    const { principal, rate, years, monthly } = calculator;
    let total = principal;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    
    for (let i = 0; i < months; i++) {
      total = total * (1 + monthlyRate) + monthly;
    }
    
    return total.toFixed(2);
  };

  return (
    <div className="space-y-8">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900"
      >
        Financial Freedom
      </motion.h2>

      {/* Tab Navigation */}
      <motion.div 
        className="flex border-b"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {['overview', 'savings', 'calculator'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && <OverviewTab savings={savings} />}
          {activeTab === 'savings' && (
            <SavingsTab savings={savings} setSavings={setSavings} />
          )}
          {activeTab === 'calculator' && (
            <CalculatorTab 
              calculator={calculator} 
              setCalculator={setCalculator} 
              calculate={calculateCompoundInterest} 
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const OverviewTab = ({ savings }) => {
  const metrics = [
    { icon: <FiDollarSign className="text-green-500" />, title: "Monthly Savings", value: "$850" },
    { icon: <FiTrendingUp className="text-blue-500" />, title: "Investment Growth", value: "+12.3%" },
    { icon: <FiPieChart className="text-purple-500" />, title: "Debt Reduction", value: "-$1,200" },
    { icon: <FiCreditCard className="text-yellow-500" />, title: "Credit Score", value: "742" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-50 rounded-full">
                {metric.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg"
        whileHover={{ scale: 1.01 }}
      >
        <h3 className="text-xl font-semibold mb-4">Savings Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">
              ${savings.current.toLocaleString()} saved
            </span>
            <span className="text-sm font-medium text-gray-500">
              ${savings.target.toLocaleString()} goal
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div 
              className="bg-green-600 h-4 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${(savings.current/savings.target)*100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-sm text-gray-500">
            {Math.round((savings.current/savings.target)*100)}% completed - $
            {(savings.target - savings.current).toLocaleString()} to go
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const SavingsTab = ({ savings, setSavings }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Manage Savings Goals</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Amount ($)
          </label>
          <input
            type="number"
            value={savings.target}
            onChange={(e) => setSavings({ ...savings, target: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Amount ($)
          </label>
          <input
            type="number"
            value={savings.current}
            onChange={(e) => setSavings({ ...savings, current: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

const CalculatorTab = ({ calculator, setCalculator, calculate }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Investment Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Investment ($)
          </label>
          <input
            type="number"
            value={calculator.principal}
            onChange={(e) => setCalculator({ ...calculator, principal: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Return Rate (%)
          </label>
          <input
            type="number"
            value={calculator.rate}
            onChange={(e) => setCalculator({ ...calculator, rate: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years to Grow
          </label>
          <input
            type="number"
            value={calculator.years}
            onChange={(e) => setCalculator({ ...calculator, years: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Contribution ($)
          </label>
          <input
            type="number"
            value={calculator.monthly}
            onChange={(e) => setCalculator({ ...calculator, monthly: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800">Future Value</h4>
        <p className="text-2xl font-bold mt-1">${calculate()}</p>
        <p className="text-sm text-blue-600 mt-2">
          Based on compound interest calculations
        </p>
      </div>
    </div>
  );
};

export default Finance;