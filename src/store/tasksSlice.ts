import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../types';

const initialState: TasksState = {
  tasks: [
    { id: '1', title: 'Complete project proposal', completed: false, category: 'work', priority: 'high', dueDate: new Date(Date.now() + 1000 * 60 * 60 * 3), createdAt: new Date().toISOString() },
    { id: '2', title: 'Buy groceries', completed: false, category: 'groceries', priority: 'medium', dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), createdAt: new Date().toISOString() },
    { id: '3', title: 'Go for a run', completed: true, category: 'health', priority: 'low', dueDate: null, createdAt: new Date().toISOString() },
    { id: '4', title: 'Pay electricity bill', completed: false, category: 'finance', priority: 'high', dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48), createdAt: new Date().toISOString() },
  ],
  notifications: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        id: string; // Added id to payload
        title: string;
        category: 'personal' | 'work' | 'groceries' | 'health' | 'finance';
        priority: 'high' | 'medium' | 'low';
        dueDate: Date | null;
      }>,
    ) => {
      const { id, title, category, priority, dueDate } = action.payload;
      state.tasks.push({
        id, // Use provided id instead of generating it here
        title,
        completed: false,
        category,
        priority,
        dueDate,
        createdAt: new Date().toISOString(),
      });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.notifications = state.notifications.filter((id) => id !== action.payload);
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setNotifications: (state, action: PayloadAction<string[]>) => {
      state.notifications = action.payload;
    },
  },
});

export const { addTask, toggleTask, removeTask, reorderTasks, setNotifications } = tasksSlice.actions;

export default tasksSlice.reducer;