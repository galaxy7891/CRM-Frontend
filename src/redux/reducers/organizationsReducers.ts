import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  organization: null,
  organizations: [],
};

// Define the slice
const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setOrganization: (state, action) => {
      state.organization = action.payload;
    },
    setOrganizations: (state, action) => {
      state.organizations = action.payload;
    },
  },
});

// export the setter funtion
export const { setOrganization, setOrganizations } = organizationsSlice.actions;

// export the reducer
export default organizationsSlice.reducer;
