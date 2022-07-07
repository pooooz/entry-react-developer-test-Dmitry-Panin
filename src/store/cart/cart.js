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

    changeQuantity(state, action) {
      const productIndex = current(state).products.findIndex(
        (element) =>
          element.id === action.payload.product.id &&
          JSON.stringify(element.attributes) ===
            JSON.stringify(action.payload.product.attributes)
      );
      state.products[productIndex].quantity += action.payload.count;
      state.productsCount += action.payload.count;
      if (state.products[productIndex].quantity === 0) {
        state.products.splice(productIndex, 1);
      }
    },

    order(state) {
      state.products.splice(0, state.products.length);
      state.productsCount = 0;
    },
  },
});

export const { addProduct, changeQuantity, order } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
