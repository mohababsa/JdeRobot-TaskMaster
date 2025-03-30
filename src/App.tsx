import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from './store';
import { setNotifications } from './store/tasksSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import SearchBar from './components/SearchBar';
import './App.css';

export default function App() {
  const [showFilters, setShowFilters] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false); // Added for theme toggle
  const dispatch = useDispatch();
  const { tasks, notifications } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    const checkDueDates = () => {
      const now = new Date();
      const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const newNotifications = tasks
        .filter((task) => {
          if (!task.dueDate) return false;
          const dueDate = new Date(task.dueDate);
          return dueDate > now && dueDate <= twentyFourHoursFromNow && !task.completed;
        })
        .map((task) => task.id);

      dispatch(setNotifications(newNotifications));
    };

    checkDueDates();
    const interval = setInterval(checkDueDates, 60000);
    return () => clearInterval(interval);
  }, [tasks, dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        <main className="flex-grow py-10 dark:text-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Management</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">Organize your tasks efficiently</p>
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
              <button
                onClick={() => setShowTaskForm(true)}
                className="mb-6 px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 flex items-center"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>

              <div className="mt-6">
                <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
                  {['all', 'active', 'completed', 'due-soon'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 px-4 text-lg font-medium ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
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
                    <TaskList filter={activeTab as 'all' | 'active' | 'completed' | 'due-soon'} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
      </div>
    </DndProvider>
  );
}