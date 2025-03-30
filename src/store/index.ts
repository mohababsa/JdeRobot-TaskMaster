import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import filtersReducer from './filtersSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;