import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { reorderTasks } from '../store/tasksSlice';
import TaskItem from './TaskItem';

interface TaskListProps {
  filter: 'all' | 'active' | 'completed' | 'due-soon';
}

export default function TaskList({ filter }: TaskListProps) {
  const dispatch = useDispatch();
  const { tasks, notifications } = useSelector((state: RootState) => state.tasks);
  const { status, category, priority, searchTerm } = useSelector((state: RootState) => state.filters);

  const moveTask = useCallback(
    (fromIndex: number, toIndex: number) => {
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(fromIndex, 1);
      updatedTasks.splice(toIndex, 0, movedTask);
      dispatch(reorderTasks(updatedTasks));
    },
    [tasks, dispatch],
  );

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'due-soon' && !notifications.includes(task.id)) return false;

    if (status !== 'all') {
      if (status === 'completed' && !task.completed) return false;
      if (status === 'incomplete' && task.completed) return false;
    }

    if (category !== 'all' && task.category !== category) return false;
    if (priority !== 'all' && task.priority !== priority) return false;
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found. Add some tasks to get started!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskItem key={task.id} task={task} index={index} moveTask={moveTask} />
      ))}
    </div>
  );
}