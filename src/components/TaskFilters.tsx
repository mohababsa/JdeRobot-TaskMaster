import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setStatusFilter, setCategoryFilter, setPriorityFilter, setSearchTerm, clearFilters } from '../store/filtersSlice';

export default function TaskFilters() {
  const dispatch = useDispatch();
  const { status, category, priority, searchTerm } = useSelector((state: RootState) => state.filters);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as 'all' | 'completed' | 'incomplete' | 'due-soon';
    console.log('Dispatching new status:', newStatus); // Debug log
    dispatch(setStatusFilter(newStatus));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategoryFilter(e.target.value as 'all' | 'personal' | 'work' | 'groceries' | 'health' | 'finance'));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPriorityFilter(e.target.value as 'all' | 'high' | 'medium' | 'low'));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  console.log('Current filters state:', { status, category, priority, searchTerm }); // Debug log

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full sm:w-1/4 p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All</option>
          <option value="incomplete">Active</option>
          <option value="completed">Completed</option>
          <option value="due-soon">Due Soon</option>
        </select>

        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full sm:w-1/4 p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="finance">Finance</option>
        </select>

        <select
          value={priority}
          onChange={handlePriorityChange}
          className="w-full sm:w-1/4 p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
          className="w-full sm:w-1/4 p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}