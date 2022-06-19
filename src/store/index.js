import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { currencyReducer } from './currency/currency';

const rootReducer = combineReducers({
  currency: currencyReducer,
});

export const store = configureStore({ reducer: rootReducer });
