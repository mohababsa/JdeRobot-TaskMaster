import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  status: 'all' | 'completed' | 'incomplete';
  category: 'all' | 'personal' | 'work' | 'groceries' | 'health' | 'finance';
  priority: 'all' | 'high' | 'medium' | 'low';
  searchTerm: string;
}

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
      state.category = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<'all' | 'high' | 'medium' | 'low'>) => {
      state.priority = action.payload; // Updated to specific union type
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