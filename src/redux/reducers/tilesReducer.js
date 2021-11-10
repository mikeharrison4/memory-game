import { createSlice } from '@reduxjs/toolkit';
import { tileData } from '../../constants';

const initialState = tileData;

export const tilesReducer = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    setTiles: (state) => {
      return [...state];
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTiles, decrement, incrementByAmount } = tilesReducer.actions;

export default tilesReducer.reducer;