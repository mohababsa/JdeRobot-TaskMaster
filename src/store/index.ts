import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import authReducer from './authSlice';
import filtersReducer from './filtersSlice'; // Add filters reducer

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    filters: filtersReducer, // Add filters to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;