import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  token: localStorage.getItem('token') || null,
};

// Define the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
      state.token = action.payload;
    },
  },
});

// Export the actions
export const { setToken } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
