import { createSlice } from '@reduxjs/toolkit';

//  Define initial state
const initialState = {
  logProfile: [],
};

// Define the slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLogProfile: (state, action) => {
      state.logProfile = action.payload;
    },
  },
});

// export the setter funtion
export const { setLogProfile } = profileSlice.actions;

// export the reducer
export default profileSlice.reducer;
