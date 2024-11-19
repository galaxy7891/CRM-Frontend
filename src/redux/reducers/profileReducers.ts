import { createSlice } from '@reduxjs/toolkit';
import { profileState } from '@/types/profileTypes';

const initialState: profileState = {
  user: null,
  userCompany: null,
  logProfile: [],
  dashboardUser: { date: '', greeting: '', user: '' },
  dashboardActivities: { leads: 0, contacts: 0, customers_companies: 0 },
  dashboardDealsValue: {
    qualification: '',
    proposal: '',
    negotiation: '',
    won: '',
    lose: '',
  },
  dashboardDealsCount: {
    qualification: 0,
    proposal: 0,
    negotiation: 0,
    won: 0,
    lose: 0,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserCompany: (state, action) => {
      state.userCompany = action.payload;
    },
    setLogProfile: (state, action) => {
      state.logProfile = action.payload;
    },
    setDashboardUser: (state, action) => {
      state.dashboardUser = action.payload;
    },
    setDashboardActivities: (state, action) => {
      state.dashboardActivities = action.payload;
    },
    setDashboardDealsValue: (state, action) => {
      state.dashboardDealsValue = action.payload;
    },
    setDashboardDealsCount: (state, action) => {
      state.dashboardDealsCount = action.payload;
    },
  },
});

export const {
  setUser,
  setUserCompany,
  setLogProfile,
  setDashboardUser,
  setDashboardActivities,
  setDashboardDealsValue,
  setDashboardDealsCount,
} = profileSlice.actions;

export default profileSlice.reducer;
