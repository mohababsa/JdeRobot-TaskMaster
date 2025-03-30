import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setStatusFilter, setCategoryFilter, setPriorityFilter } from '../store/filtersSlice';

export default function TaskFilters() {
  const dispatch = useDispatch();
  const { status, category, priority } = useSelector((state: RootState) => state.filters);

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-100 rounded-lg mb-4">
      <div className="flex-1 space-y-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => dispatch(setStatusFilter(e.target.value as 'all' | 'completed' | 'incomplete'))}
          className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All</option>
          <option value="incomplete">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex-1 space-y-1">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) =>
            dispatch(setCategoryFilter(e.target.value as 'all' | 'personal' | 'work' | 'groceries' | 'health' | 'finance'))
          }
          className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Categories</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      <div className="flex-1 space-y-1">
        <label className="text-sm font-medium text-gray-700">Priority</label>
        <select
          value={priority}
          onChange={(e) => dispatch(setPriorityFilter(e.target.value))}
          className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
}