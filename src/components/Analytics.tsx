import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Analytics() {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const categories = ['personal', 'work', 'groceries', 'health', 'finance'];
  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Completed Tasks',
        data: categories.map((cat) => tasks.filter((t) => t.category === cat && t.completed).length),
        backgroundColor: '#10B981', // Emerald green
      },
      {
        label: 'Incomplete Tasks',
        data: categories.map((cat) => tasks.filter((t) => t.category === cat && !t.completed).length),
        backgroundColor: '#EF4444', // Red
      },
    ],
  };

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) => tasks.filter((t) => t.category === cat).length),
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'], // Blue, Green, Yellow, Purple, Pink
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Task Completion by Category' },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' as const },
      title: { display: true, text: 'Task Distribution by Category' },
    },
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Bar data={barData} options={options} />
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
}