import { combineReducers } from '@reduxjs/toolkit';
import leads from './leadsReducers';
import auth from './authReducers';
import organizations from './organizationsReducers';
import profile from './profileReducers';
import products from './productsReducers'

export default combineReducers({ leads, auth, organizations, profile, products });
