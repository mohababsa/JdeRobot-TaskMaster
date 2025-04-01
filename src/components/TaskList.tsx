import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateTask, deleteTask, fetchTasks, updateTaskInFirestore, deleteTaskFromFirestore, setTasks, clearNotification } from '../store/tasksSlice';
import { useDrag, useDrop } from 'react-dnd';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface TaskListProps {}

interface TaskItemProps {
  task: import('../store/tasksSlice').Task;
  index: number;
  moveTask: (fromIndex: number, toIndex: number) => void;
}

const TaskItem = ({ task, index, moveTask }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
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

  const handleToggleComplete = () => {
    const updatedTask = { ...task, completed: !task.completed };
    dispatch(updateTask(updatedTask));
    if (user) {
      dispatch(updateTaskInFirestore(updatedTask));
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    if (user) {
      dispatch(deleteTaskFromFirestore(task.id));
    }
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.6 : 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      ref={ref}
      className={`flex items-center p-4 mb-3 rounded-lg border-l-4 ${
        priorityColors[task.priority]
      } ${isDragging ? 'opacity-60 scale-95' : 'opacity-100'} ${
        task.completed ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
      } shadow-md hover:shadow-lg transition-all duration-200 cursor-move`}
    >
      <span className="mr-3 text-gray-400 dark:text-gray-500 cursor-grab text-lg">☰</span>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
        className="mr-3 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-lg font-medium truncate ${
            task.completed ? 'line-through text-gray-400 dark:text-gray-400' : 'text-gray-800 dark:text-white'
          }`}
        >
          {task.title}
        </p>
        <div className="flex flex-wrap gap-2 mt-1 text-sm">
          <span className="flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
            {categoryIcons[task.category]}
            <span className="ml-1 capitalize">{task.category}</span>
          </span>
          <span className="flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
            {priorityIcons[task.priority]}
            <span className="ml-1 capitalize">{task.priority}</span>
          </span>
          {task.dueDate && (
            <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
              {format(new Date(task.dueDate), 'MMM d')}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="ml-4 text-red-500 hover:text-red-700 dark:hover:text-red-400 text-lg"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default function TaskList({}: TaskListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, notifications } = useSelector((state: RootState) => state.tasks);
  const { status, category, priority, searchTerm } = useSelector((state: RootState) => state.filters);
  const user = useSelector((state: RootState) => state.auth.user);
  const [page, setPage] = useState(1); // Current page
  const tasksPerPage = 10; // Number of tasks per page

  useEffect(() => {
    if (user?.uid) {
      console.log('User signed in, fetching tasks for:', user.uid);
      const unsubscribe = dispatch(fetchTasks(user.uid));
      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    } else {
      console.log('No user signed in yet');
    }
  }, [dispatch, user?.uid]);

  const dropRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { index: number }) => {
      // Optional: Add logic if you want drop to toggle completion
    },
  }));

  drop(dropRef);

  const moveTask = (fromIndex: number, toIndex: number) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    dispatch(setTasks(updatedTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    const now = new Date();
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    console.log('Filtering task:', task.title, 'Status:', status);

    const statusMatch =
      status === 'all' ||
      (status === 'completed' && task.completed) ||
      (status === 'incomplete' && !task.completed) ||
      (status === 'due-soon' && dueDate && dueDate > now && dueDate <= twentyFourHoursFromNow && !task.completed);

    const categoryMatch = category === 'all' || task.category === category;

    const priorityMatch = priority === 'all' || task.priority === priority;

    const searchMatch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && categoryMatch && priorityMatch && searchMatch;
  });

  // Pagination logic
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const paginatedTasks = filteredTasks.slice((page - 1) * tasksPerPage, page * tasksPerPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Task List */}
      <div ref={dropRef} className="w-full md:w-2/3 space-y-4">
        {paginatedTasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} moveTask={moveTask} />
        ))}
        {totalTasks > tasksPerPage && (
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg ${
                page === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-600 dark:text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg ${
                page === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="w-full md:w-1/3 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg shadow"
            >
              <span>{notification}</span>
              <button
                onClick={() => dispatch(clearNotification(index))}
                className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}