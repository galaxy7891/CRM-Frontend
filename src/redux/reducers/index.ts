import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducers';
import employees from './employeesReducers';
import leads from './leadsReducers';
import contacts from './contactsReducers';
import companies from './companiesReducers';
import profile from './profileReducers';
import products from './productsReducers'

export default combineReducers({
  auth,
  employees,
  leads,
  contacts,
  companies,
  profile,
  products,
});
