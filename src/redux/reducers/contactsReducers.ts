import { createSlice } from '@reduxjs/toolkit';
import { contactsState } from '@/types/contactsTypes';
const initialState: contactsState = {
  contact: null,
  contacts: [],
  contactLog: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setLogContact: (state, action) => {
      state.contactLog = action.payload;
    },
  },
});

export const { setContact, setContacts, setLogContact } = contactsSlice.actions;

export default contactsSlice.reducer;
