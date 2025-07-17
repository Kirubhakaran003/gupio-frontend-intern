import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: [],
  reducers: {
    addToFavourites: (state, action) => {
      if (!state.find(item => item.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFromFavourites: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
