import { combineReducers } from '@reduxjs/toolkit';
import leads from './leads';
import auth from './auth';
import organizations from './organizations';

export default combineReducers({ leads, auth, organizations });
