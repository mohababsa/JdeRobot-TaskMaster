import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState, AppDispatch } from './store';
import { fetchTasks } from './store/tasksSlice';
import { setUser } from './store/authSlice';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import SearchBar from './components/SearchBar';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Calendar from './components/Calendar';
import { Bars3Icon, XMarkIcon, CheckCircleIcon, ChartBarIcon, DocumentChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';
import './App.css';

export default function App() {
  const [showFilters, setShowFilters] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeView, setActiveView] = useState('tasks');
  const [activeTaskTab, setActiveTaskTab] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, notifications } = useSelector((state: RootState) => state.tasks);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(setUser(firebaseUser));
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch, user?.uid]);

  const views = [
    { id: 'tasks', label: 'Tasks', icon: CheckCircleIcon },
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'analytics', label: 'Analytics', icon: DocumentChartBarIcon },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onSignInClick={() => setShowSignIn(true)}
          onSignUpClick={() => setShowSignUp(true)}
        />
        <main className="flex flex-1 dark:text-white">
          {user ? (
            <div className="flex w-full">
              {/* Sidebar */}
              <div
                className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-6 transform transition-transform duration-300 ease-in-out z-50 ${
                  isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:relative md:translate-x-0 md:z-0`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 md:hidden"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {views.map((view) => (
                    <button
                      key={view.id}
                      onClick={() => {
                        setActiveView(view.id);
                        setIsSidebarOpen(false); // Close on mobile after selection
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-lg font-medium rounded-lg ${
                        activeView === view.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <view.icon className="h-6 w-6" />
                      {view.label}
                    </button>
                  ))}
                </nav>
              </div>
              {/* Overlay for mobile when sidebar is open */}
              {isSidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                ></div>
              )}
              {/* Main Content */}
              <div className="flex-1 py-10 px-6">
                <div className="flex items-center justify-between mb-6 md:mb-0">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 md:hidden"
                  >
                    <Bars3Icon className="h-8 w-8" />
                  </button>
                </div>
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TaskMaster</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">Organize your life efficiently</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowFilters(!showFilters)}
                          className={`p-3 rounded-lg ${showFilters ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'} hover:bg-gray-200 dark:hover:bg-gray-700`}
                        >
                          <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-2 4H6m10 4H8m6 4H10" />
                          </svg>
                        </button>
                        <div className="relative">
                          <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V3a2 2 0 00-4 0v2.083A6 6 0 004 11v3.159c0 .538-.214 1.052-.595 1.436L2 17h5m8 0v1a3 3 0 01-6 0v-1m6 0H9" />
                          </svg>
                          {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm rounded-full h-5 w-5 flex items-center justify-center">
                              {notifications.length}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <SearchBar />
                    {showFilters && <TaskFilters />}
                    {activeView === 'tasks' && (
                      <button
                        onClick={() => setShowTaskForm(true)}
                        className="mb-6 px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 flex items-center"
                      >
                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Task
                      </button>
                    )}
                    <div className="mt-6">
                      {activeView === 'tasks' && (
                        <>
                          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
                            {['all', 'active', 'completed', 'due-soon'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActiveTaskTab(tab)}
                                className={`pb-2 px-4 text-lg font-medium ${
                                  activeTaskTab === tab
                                    ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                                }`}
                              >
                                {tab === 'all' && 'All'}
                                {tab === 'active' && 'Active'}
                                {tab === 'completed' && 'Completed'}
                                {tab === 'due-soon' && 'Due Soon'}
                              </button>
                            ))}
                          </div>
                          <div className="mt-6">
                            {tasks.length === 0 ? (
                              <p className="text-center text-gray-500 dark:text-gray-400">No tasks yet. Add some to get started!</p>
                            ) : (
                              <TaskList />
                            )}
                          </div>
                        </>
                      )}
                      {activeView === 'dashboard' && <Dashboard />}
                      {activeView === 'analytics' && <Analytics />}
                      {activeView === 'calendar' && <Calendar />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh] w-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Authentication Required</h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mt-2">Please sign in to manage your tasks.</p>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setShowSignUp(true)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
        {showTaskForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <TaskForm onClose={() => setShowTaskForm(false)} />
          </div>
        )}
        <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
        <SignUpModal
          isOpen={showSignUp}
          onClose={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        />
      </div>
    </DndProvider>
  );
}