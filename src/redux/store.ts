import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/index';

const store = configureStore({
  devTools: true,
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
