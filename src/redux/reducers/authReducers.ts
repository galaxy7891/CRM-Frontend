import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: {
    photo: typeof window !== 'undefined' ? localStorage.getItem('photo') : null,
    email: typeof window !== 'undefined' ? localStorage.getItem('email') : null,
    role: typeof window !== 'undefined' ? localStorage.getItem('role') : null,
    id: typeof window !== 'undefined' ? localStorage.getItem('id_user') : null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        localStorage.setItem('photo', action.payload.photo);
        localStorage.setItem('email', action.payload.email);
        localStorage.setItem('role', action.payload.role);
        localStorage.setItem('id_user', action.payload.id);
      } else {
        localStorage.removeItem('photo');
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
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
