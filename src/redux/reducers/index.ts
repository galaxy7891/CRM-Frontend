import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducers';
import employees from './employeesReducers';
import leads from './leadsReducers';
import organizations from './organizationsReducers';
import profile from './profileReducers';

export default combineReducers({
  auth,
  employees,
  leads,
  organizations,
  profile,
});
