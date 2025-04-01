import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Dashboard() {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const dueSoonTasks = tasks.filter((task) => {
    const now = new Date();
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return dueDate && dueDate > now && dueDate <= twentyFourHoursFromNow && !task.completed;
  }).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const categories = ['personal', 'work', 'groceries', 'health', 'finance'];
  const categoryBreakdown = categories.map((cat) => ({
    name: cat,
    total: tasks.filter((t) => t.category === cat).length,
    completed: tasks.filter((t) => t.category === cat && t.completed).length,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Total Tasks</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{totalTasks}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Completed</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{completedTasks}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Due Soon</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{dueSoonTasks}</p>
        </div>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Completion Progress</h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-indigo-600 h-4 rounded-full"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{completionRate}% Complete</p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Category Breakdown</h3>
        <div className="space-y-4">
          {categoryBreakdown.map((cat) => (
            <div key={cat.name} className="flex justify-between items-center">
              <span className="text-gray-800 dark:text-white capitalize">{cat.name}</span>
              <span className="text-gray-600 dark:text-gray-300">
                {cat.completed}/{cat.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}