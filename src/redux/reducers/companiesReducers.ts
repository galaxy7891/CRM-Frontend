import { createSlice } from '@reduxjs/toolkit';
import { companiesState } from '@/types/companiesTypes';

const initialState: companiesState = {
  company: null,
  companies: [],
  companyLog: [],
};

const companiesSlicer = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setCompanyLog: (state, action) => {
      state.companyLog = action.payload;
    },
  },
});

export const { setCompany, setCompanies, setCompanyLog } =
  companiesSlicer.actions;

export default companiesSlicer.reducer;
