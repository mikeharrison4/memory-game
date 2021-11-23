import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

export const matchedPairsReducer = createSlice({
  name: 'matchedPairs',
  initialState,
  reducers: {
    setMatchedPairs: state => ++state,
    resetMatchedPairs: () => initialState,
  },
});

export const { setMatchedPairs, resetMatchedPairs } = matchedPairsReducer.actions;

export default matchedPairsReducer.reducer;