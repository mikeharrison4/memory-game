import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const gameFinishedResultReducer = createSlice({
  name: 'gameFinished',
  initialState,
  reducers: {
    setGameFinishedResult: (_, action) => action.payload,
  },
});

export const { setGameFinishedResult } = gameFinishedResultReducer.actions;

export default gameFinishedResultReducer.reducer;