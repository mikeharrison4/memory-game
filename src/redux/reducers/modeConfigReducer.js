import { createSlice } from '@reduxjs/toolkit';
import { modeConstants } from '../../constants/modeConstants';

const initialState = null;

export const modeConfigReducer = createSlice({
  name: 'modeConfig',
  initialState,
  reducers: {
    setModeConfig: (_, action) => ({ ...modeConstants[action.payload] }),
    clearModeConfig: () => initialState,
    decrementRemaining: state => ({
      ...state,
      remaining: state.remaining - 1,
    }),
  },
});

export const {
  setModeConfig,
  clearModeConfig,
  decrementRemaining,
} = modeConfigReducer.actions;

export default modeConfigReducer.reducer;