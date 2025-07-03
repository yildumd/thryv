import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';

// Page Components
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import FourWeekProgram from './pages/Programs/FourWeekProgram';
import EightWeekProgram from './pages/Programs/EightWeekProgram';

// Module Components
import Fitness from './pages/Modules/Fitness';
import Finance from './pages/Modules/Finance';
import Nutrition from "@/components/Nutrition/Nutrition";
import Mindset from './components/Mindset/Mindset';

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Custom NavLink component
  const CustomNavLink = ({ to, children }) => (
    <motion.div whileHover={{ scale: 1.05 }}>
      <NavLink 
        to={to}
        className={({ isActive }) => 
          `text-gray-700 hover:text-blue-600 font-medium transition-colors ${
            isActive ? 'text-blue-600 font-semibold' : ''
          }`
        }
      >
        {children}
      </NavLink>
    </motion.div>
  );

  // Mobile navigation link
  const MobileNavLink = ({ to, children }) => (
    <NavLink 
      to={to}
      onClick={() => setIsMenuOpen(false)}
      className={({ isActive }) => 
        `block px-4 py-3 rounded-md text-base font-medium ${
          isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
        }`
      }
    >
      {children}
    </NavLink>
  );

  // Dropdown menu for modules
  const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium"
          aria-expanded={isOpen}
        >
          Modules <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
            <MobileNavLink to="/fitness">Fitness</MobileNavLink>
            <MobileNavLink to="/nutrition">Nutrition</MobileNavLink>
            <MobileNavLink to="/finance">Finance</MobileNavLink>
            <MobileNavLink to="/mindset">Mindset</MobileNavLink>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
            Thryv
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>
            <CustomNavLink to="/4-week-program">4-Week</CustomNavLink>
            <CustomNavLink to="/8-week-program">8-Week</CustomNavLink>
            <DropdownMenu />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-4 py-2 space-y-1">
              <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
              <MobileNavLink to="/4-week-program">4-Week Program</MobileNavLink>
              <MobileNavLink to="/8-week-program">8-Week Program</MobileNavLink>
              <MobileNavLink to="/fitness">Fitness</MobileNavLink>
              <MobileNavLink to="/nutrition">Nutrition</MobileNavLink>
              <MobileNavLink to="/finance">Finance</MobileNavLink>
              <MobileNavLink to="/mindset">Mindset</MobileNavLink>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/4-week-program" element={<FourWeekProgram />} />
              <Route path="/8-week-program" element={<EightWeekProgram />} />
              <Route path="/fitness" element={<Fitness />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/mindset" element={<Mindset />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Thryv - Transform Your Life
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-blue-600">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-blue-600">Terms of Service</Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-blue-600">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;