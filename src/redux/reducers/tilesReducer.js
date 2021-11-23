import { createSlice } from '@reduxjs/toolkit';
import tileData from '../../constants/tileDateConstants';

const initialState = tileData;

export const tilesReducer = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    setTiles: (_, action) => [...action.payload],
  },
});

export const { setTiles } = tilesReducer.actions;

export default tilesReducer.reducer;