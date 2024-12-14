import { combineReducers } from '@reduxjs/toolkit';
import administrator from './administratorReducers';
import auth from './authReducers';
import employees from './employeesReducers';
import leads from './leadsReducers';
import contacts from './contactsReducers';
import companies from './companiesReducers';
import profile from './profileReducers';
import deals from './dealsReducers';
import products from './productsReducers';
import CMS from './CMSReducers';

export default combineReducers({
  administrator,
  auth,
  employees,
  leads,
  contacts,
  companies,
  profile,
  deals,
  products,
  CMS,
});
