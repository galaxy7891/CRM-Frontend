import { combineReducers } from '@reduxjs/toolkit';
import leads from './leads';
import auth from './auth';

export default combineReducers({ leads, auth });
