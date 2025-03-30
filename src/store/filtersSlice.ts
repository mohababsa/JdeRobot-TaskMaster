import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '../types';

const initialState: FiltersState = {
  status: 'all',
  category: 'all',
  priority: 'all',
  searchTerm: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<'all' | 'completed' | 'incomplete'>) => {
      state.status = action.payload;
    },
    setCategoryFilter: (
      state,
      action: PayloadAction<'all' | 'personal' | 'work' | 'groceries' | 'health' | 'finance'>,
    ) => {
      state.category = action.payload; // Line 19 - now type-safe
    },
    setPriorityFilter: (state, action: PayloadAction<string>) => {
      state.priority = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearFilters: (state) => {
      state.status = 'all';
      state.category = 'all';
      state.priority = 'all';
      state.searchTerm = '';
    },
  },
});

export const { setStatusFilter, setCategoryFilter, setPriorityFilter, setSearchTerm, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;