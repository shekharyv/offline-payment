import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import { Sun, Moon, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Demo', path: '/demo' },
    { name: 'History', path: '/history' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all text-white font-bold text-lg">
              OP
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white hidden sm:block">
              OfflinePay
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === link.path 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-gray-100/80 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs font-semibold border border-transparent dark:border-gray-700/50"
            >
              <Languages size={16} className="text-gray-700 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 uppercase">{language === 'en' ? 'EN' : 'हिंदी'}</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-transparent dark:border-gray-700/50 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Toggle Theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
