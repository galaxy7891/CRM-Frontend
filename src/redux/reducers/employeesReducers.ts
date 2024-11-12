import { createSlice } from '@reduxjs/toolkit';
import { employeesState } from '@/types/employeeTypes';

const initialState: employeesState = {
  employee: null,
  employees: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
});

export const { setEmployee, setEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;
