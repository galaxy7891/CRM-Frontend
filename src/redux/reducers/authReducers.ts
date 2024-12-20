import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: {
    email: typeof window !== 'undefined' ? localStorage.getItem('email') : null,
    role: typeof window !== 'undefined' ? localStorage.getItem('role') : null,
    id: typeof window !== 'undefined' ? localStorage.getItem('id_user') : null,
    account_type:
      typeof window !== 'undefined'
        ? localStorage.getItem('account_type')
        : null,
    duration:
      typeof window !== 'undefined' ? localStorage.getItem('duration') : null,
  },
  userTest: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        localStorage.setItem('email', action.payload.email);
        localStorage.setItem('role', action.payload.role);
        localStorage.setItem('id_user', action.payload.id);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('id_user');
      }
      state.user = action.payload;
    },
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
      state.token = action.payload;
    },
    setUserTest: (state, action) => {
      state.userTest = action.payload;
    },
  },
});

export const { setToken, setUser, setUserTest } = authSlice.actions;

export default authSlice.reducer;
