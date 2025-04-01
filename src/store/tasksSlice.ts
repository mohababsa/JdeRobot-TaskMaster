import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, where, doc, updateDoc, deleteDoc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { AppDispatch } from '../store';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  userId: string;
  category: 'personal' | 'work' | 'groceries' | 'health' | 'finance';
}

interface TasksState {
  tasks: Task[];
  notifications: string[];
}

const initialState: TasksState = {
  tasks: [],
  notifications: [],
};

const mapFirestoreToTask = (doc: QueryDocumentSnapshot<DocumentData>): Task => ({
  id: doc.id,
  title: doc.data().title,
  description: doc.data().description,
  dueDate: doc.data().dueDate,
  priority: doc.data().priority,
  completed: doc.data().completed,
  userId: doc.data().userId,
  category: doc.data().category,
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    addNotification: (state, action: PayloadAction<string>) => {
      // Prevent duplicates
      if (!state.notifications.includes(action.payload)) {
        state.notifications.push(action.payload);
      }
    },
    clearNotification: (state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, addNotification, clearNotification } = tasksSlice.actions;

export const fetchTasks = (userId: string) => (dispatch: AppDispatch) => {
  console.log(`Fetching tasks for userId: ${userId}`);
  const q = query(collection(db, 'tasks'), where('userId', '==', userId));
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const tasksData = snapshot.docs.map(mapFirestoreToTask);
      console.log('Tasks fetched:', tasksData);
      dispatch(setTasks(tasksData));
      tasksData.forEach((task) => {
        const now = new Date();
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        if (dueDate && dueDate > now && dueDate <= twentyFourHoursFromNow && !task.completed) {
          console.log('Adding notification for:', task.title);
          dispatch(addNotification(`${task.title} is due soon!`));
        }
      });
    },
    (error) => {
      console.error('Error fetching tasks:', error);
    }
  );
  return unsubscribe;
};

export const updateTaskInFirestore = (task: Task) => async () => {
  const taskRef = doc(db, 'tasks', task.id);
  await updateDoc(taskRef, {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
    completed: task.completed,
    userId: task.userId,
    category: task.category,
  });
};

export const deleteTaskFromFirestore = (taskId: string) => async () => {
  const taskRef = doc(db, 'tasks', taskId);
  await deleteDoc(taskRef);
};

export default tasksSlice.reducer;