import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  leads: [],
  lead: null,
};

// Define the slice
const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
    },
    setLead: (state, action) => {
      state.lead = action.payload;
    },
  },
});

// export the setter funtion
export const { setLeads, setLead } = leadSlice.actions;

// export the reducer
export default leadSlice.reducer;
