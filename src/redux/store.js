import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import favouritesReducer from './favouritesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favourites: favouritesReducer,
  },
});
