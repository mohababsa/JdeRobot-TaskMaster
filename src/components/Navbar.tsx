import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { signOut as reduxSignOut } from '../store/authSlice';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileModal from './ProfileModal';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode, onSignInClick, onSignUpClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile dropdown
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Profile modal
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSignOut = async () => {
    await firebaseSignOut(auth);
    dispatch(reduxSignOut());
    setIsProfileOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 w-full border-b ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur`}>
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-2xl ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>TaskMaster</span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="User profile"
              >
                <svg
                  className={`h-6 w-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                        className={`block w-full text-left px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-800'}`}
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleSignOut}
                        className={`block w-full text-left px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-800'}`}
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            {user ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsProfileModalOpen(true);
                  }}
                  className={`text-lg font-medium text-left ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className={`text-lg font-medium text-left ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onSignInClick();
                  }}
                  className={`text-lg font-medium text-left ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onSignUpClick();
                  }}
                  className={`text-lg font-medium text-left ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </header>
  );
}