import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { currencyReducer } from './currency/currency';
import { cartReducer } from './cart/cart';

const rootReducer = combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
});

export const store = configureStore({ reducer: rootReducer });
