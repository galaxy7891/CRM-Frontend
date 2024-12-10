import { createSlice } from '@reduxjs/toolkit';
import { administratorState } from '@/types/administratorTypes';

const initialState: administratorState = {
  user: null,
  clients: [],
  dashboardUser: { date: '', greeting: '', user: '' },
  dashboardActivities: {
    business: 0,
    regular: 0,
    trial: 0,
    professional: 0,
    unactive: 0,
  },
};

const administratorSlice = createSlice({
  name: 'administrator',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setClient: (state, action) => {
      state.clients = action.payload;
    },
    setDashboardUser: (state, action) => {
      state.dashboardUser = action.payload;
    },
    setDashboardActivities: (state, action) => {
      state.dashboardActivities = action.payload;
    },
  },
});

export const { setUser, setClient, setDashboardUser, setDashboardActivities } =
  administratorSlice.actions;

export default administratorSlice.reducer;
