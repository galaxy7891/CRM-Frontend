import { createSlice } from '@reduxjs/toolkit';
import { dealsState } from '@/types/dealsTypes';
// Define the initial state
const initialState: dealsState = {
  dealsQualification: [],
  dealsProposal: [],
  dealsNegotiation: [],
  dealsWon: [],
  dealsLose: [],
};

// Define the slice
const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setDealsQualification: (state, action) => {
      state.dealsQualification = action.payload;
    },
    setDealsProposal: (state, action) => {
      state.dealsProposal = action.payload;
    },
    setDealsNegotiation: (state, action) => {
      state.dealsLose = action.payload;
    },
    setDealsWon: (state, action) => {
      state.dealsWon = action.payload;
    },
    setDealsLose: (state, action) => {
      state.dealsLose = action.payload;
    },
  },
});

// export the setter funtion
export const {
  setDealsQualification,
  setDealsProposal,
  setDealsNegotiation,
  setDealsWon,
  setDealsLose,
} = dealsSlice.actions;

// export the reducer
export default dealsSlice.reducer;
