import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const flippedTilesReducer = createSlice({
  name: 'flippedTiles',
  initialState,
  reducers: {
    setFlippedTiles: (state, action) => [...state, action.payload],
    clearFlippedTiles: () => initialState,
  },
});

export const { setFlippedTiles, clearFlippedTiles } = flippedTilesReducer.actions;

export default flippedTilesReducer.reducer;