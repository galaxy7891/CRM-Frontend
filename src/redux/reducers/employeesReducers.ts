import { createSlice } from '@reduxjs/toolkit';
import { employeesState } from '@/types/employeeTypes';

const initialState: employeesState = {
  employee: null,
  employees: [],
  employeeLog: [],
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
    setEmployeeLog: (state, action) => {
      state.employeeLog = action.payload;
    },
  },
});

export const { setEmployee, setEmployees, setEmployeeLog } =
  employeesSlice.actions;

export default employeesSlice.reducer;
