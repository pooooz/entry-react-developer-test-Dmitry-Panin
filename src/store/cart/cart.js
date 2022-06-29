import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productsCount: 0,
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addProduct(state, action) {
      const productIndex = current(state).products.findIndex(
        (element) =>
          element.id === action.payload.id &&
          JSON.stringify(element.attributes) ===
            JSON.stringify(action.payload.attributes)
      );
      if (productIndex >= 0) {
        state.products[productIndex].quantity++;
        state.productsCount++;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        state.productsCount++;
      }
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
