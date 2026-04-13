import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { dark, setDark } = useTheme();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg">IS</div>
          <span className="font-bold text-lg text-blue-800 dark:text-blue-400 hidden sm:block">IntlSchool</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/portal'}
                className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400 hover:underline">
                <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                {user.role === 'admin' ? 'Admin Panel' : 'My Portal'}
              </Link>
              <button onClick={handleLogout}
                className="flex items-center gap-1 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition font-medium">
                🚪 Logout
              </button>
            </>
          ) : (
            <Link to="/login"
              className="text-sm bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded-lg transition">
              Login
            </Link>
          )}
          <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            {dark ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            {dark ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex flex-col px-4 py-3 gap-3">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700">
                  {l.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? '/admin' : '/portal'} onClick={() => setOpen(false)}
                    className="text-sm text-blue-700 dark:text-blue-400">
                    {user.role === 'admin' ? 'Admin Panel' : 'My Portal'}
                  </Link>
                  <button onClick={() => { handleLogout(); setOpen(false); }}
                    className="text-sm text-left text-red-600">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)}
                  className="text-sm text-blue-700 dark:text-blue-400">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
