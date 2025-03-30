import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth'; // Only import User

interface AuthState {
  user: User | null; // Firebase User type
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setError, signOut } = authSlice.actions;
export default authSlice.reducer;