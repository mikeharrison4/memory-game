import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const countdownReducer = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    setShowCountdown: (_, action) => action.payload,
  },
});

export const { setShowCountdown } = countdownReducer.actions;

export default countdownReducer.reducer;