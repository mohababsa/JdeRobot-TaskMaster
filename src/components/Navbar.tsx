import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { signOut as reduxSignOut } from '../store/authSlice';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode, onSignInClick, onSignUpClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSignOut = async () => {
    await firebaseSignOut(auth);
    dispatch(reduxSignOut());
  };

  return (
    <header className={`sticky top-0 z-40 w-full border-b ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur`}>
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-2xl ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>TaskMaster</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <span className={`text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} cursor-pointer`}>Dashboard</span>
          <span className={`text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} cursor-pointer`}>Projects</span>
          <span className={`text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} cursor-pointer`}>Calendar</span>
          <span className={`text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} cursor-pointer`}>Analytics</span>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handleSignOut}
              className={`text-lg ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={onSignInClick}
                className={`text-lg ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Sign In
              </button>
              <button
                onClick={onSignUpClick}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700"
              >
                Sign Up
              </button>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="h-6 w-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={`md:hidden border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col space-y-3 py-4 px-4">
            <span
              className={`text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} cursor-pointer`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </span>
            <span
              className={`text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} cursor-pointer`}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </span>
            <span
              className={`text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} cursor-pointer`}
              onClick={() => setIsOpen(false)}
            >
              Calendar
            </span>
            <span
              className={`text-lg font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'} cursor-pointer`}
              onClick={() => setIsOpen(false)}
            >
              Analytics
            </span>
          </div>
        </div>
      )}
    </header>
  );
}