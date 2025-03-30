import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setStatusFilter, setCategoryFilter, setPriorityFilter } from '../store/filtersSlice';

export default function TaskFilters() {
  const dispatch = useDispatch();
  const { status, category, priority } = useSelector((state: RootState) => state.filters);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatusFilter(e.target.value as 'all' | 'completed' | 'incomplete'));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategoryFilter(e.target.value as 'all' | 'personal' | 'work' | 'groceries' | 'health' | 'finance'));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPriorityFilter(e.target.value));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <select
        value={status}
        onChange={handleStatusChange}
        className="w-full sm:w-1/3 p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
      >
        <option value="all">All Statuses</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      <select
        value={category}
        onChange={handleCategoryChange}
        className="w-full sm:w-1/3 p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
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
        className="w-full sm:w-1/3 p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}