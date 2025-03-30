import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../store/tasksSlice';

interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'personal' | 'work' | 'groceries' | 'health' | 'finance'>('personal');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      addTask({
        id: uuidv4(),
        title,
        category,
        priority,
        dueDate,
      }),
    );

    setTitle('');
    setCategory('personal');
    setPriority('medium');
    setDueDate(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Task</h2>
        
        <div className="space-y-6">
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'personal' | 'work' | 'groceries' | 'health' | 'finance')}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="groceries">Groceries</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <DatePicker
            selected={dueDate}
            onChange={(date: Date | null) => setDueDate(date)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholderText="Select due date"
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}