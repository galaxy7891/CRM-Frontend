import { createSlice } from '@reduxjs/toolkit';
import { productsState } from '@/types/productTypes';

// Define the initial state
const initialState: productsState = {
  product: null,
  products: [],
  logProduct: [],
};

// Define the slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLogProduct: (state, action) => {
      state.logProduct = action.payload;
    },
  },
});

// export the setter funtion
export const { setProduct, setProducts, setLogProduct } = productsSlice.actions;

// export the reducer
export default productsSlice.reducer;
