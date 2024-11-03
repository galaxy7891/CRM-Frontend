import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';

// make sure dispatch have type of AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
