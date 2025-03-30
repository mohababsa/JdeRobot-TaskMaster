import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { format } from 'date-fns';
import { Task } from '../types';
import { toggleTask, removeTask } from '../store/tasksSlice';

interface TaskItemProps {
  task: Task;
  index: number;
  moveTask: (fromIndex: number, toIndex: number) => void;
}

export default function TaskItem({ task, index, moveTask }: TaskItemProps) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'task',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  const priorityColors = {
    high: 'border-red-500 bg-red-50',
    medium: 'border-yellow-500 bg-yellow-50',
    low: 'border-green-500 bg-green-50',
  };

  const categoryIcons: Record<Task['category'], JSX.Element> = {
    personal: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    work: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    groceries: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    health: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    finance: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  };

  const priorityIcons: Record<Task['priority'], JSX.Element> = {
    high: <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>,
    medium: <svg className="h-4 w-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6m-6 4h6m-6 4h6" /></svg>,
    low: <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  };

  return (
    <div
      ref={ref}
      className={`flex items-center p-4 mb-3 rounded-lg border-l-4 ${
        priorityColors[task.priority]
      } ${isDragging ? 'opacity-60 scale-95' : 'opacity-100'} ${
        task.completed ? 'bg-gray-100' : 'bg-white'
      } shadow-md hover:shadow-lg transition-all duration-200 cursor-move`}
    >
      <span className="mr-3 text-gray-400 cursor-grab text-lg">☰</span>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
        className="mr-3 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-lg font-medium truncate ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {task.title}
        </p>
        <div className="flex flex-wrap gap-2 mt-1 text-sm">
          <span className="flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800">
            {categoryIcons[task.category]}
            <span className="ml-1 capitalize">{task.category}</span>
          </span>
          <span className="flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800">
            {priorityIcons[task.priority]}
            <span className="ml-1 capitalize">{task.priority}</span>
          </span>
          {task.dueDate && (
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {format(new Date(task.dueDate), 'MMM d')}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => dispatch(removeTask(task.id))}
        className="ml-4 text-red-500 hover:text-red-700 text-lg"
      >
        ✕
      </button>
    </div>
  );
}