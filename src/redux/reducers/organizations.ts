import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  organizations: [],
  organization: null,
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
export const { setOrganizations, setOrganization } = organizationsSlice.actions;

// export the reducer
export default organizationsSlice.reducer;
