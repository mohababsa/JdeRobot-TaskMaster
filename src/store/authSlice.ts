import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  password: string; // Plain text for demo (not hashed)
}

interface AuthState {
  user: User | null;
  users: User[]; // Store all registered users
}

const initialState: AuthState = {
  user: null,
  users: JSON.parse(localStorage.getItem('users') || '[]'), // Load from localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.user = action.payload;
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    signIn: (state, action: PayloadAction<User>) => {
      const user = state.users.find(
        (u) => u.email === action.payload.email && u.password === action.payload.password,
      );
      if (user) {
        state.user = user;
      }
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { signUp, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;