import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  leads: {},
};

// Define the slice
const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
    },
  },
});

// export the setter funtion
export const { setLeads } = leadSlice.actions;

// export the reducer
export default leadSlice.reducer;
