import { createSlice } from '@reduxjs/toolkit';
import { leadsState } from '@/types/leadsTypes';

// Define the initial state
const initialState: leadsState = {
  lead: null,
  leads: [],
  leadLog: [],
};

// Define the slice
const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {

    setLead: (state, action) => {
      state.lead = action.payload;
    },
    setLeads: (state, action) => {
      state.leads = action.payload;
    },
    setLogLead: (state, action) => {
      state.leadLog = action.payload;
    },
  },
});

// export the setter funtion
export const { setLead, setLeads, setLogLead } = leadsSlice.actions;

// export the reducer
export default leadsSlice.reducer;
