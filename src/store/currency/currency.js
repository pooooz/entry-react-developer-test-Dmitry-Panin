import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symbol: '$',
  label: 'USD',
};

const currencySlice = createSlice({
  initialState,
  name: 'currency',
  reducers: {
    selectCurrency(state, action) {
      state.symbol = action.payload.symbol;
      state.label = action.payload.label;
    },
  },
});

export const { selectCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
