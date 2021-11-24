import { createSlice } from '@reduxjs/toolkit';
import { modeConstants } from '../../constants/modeConstants';

const initialState = null;

export const modeConfigReducer = createSlice({
  name: 'modeConfig',
  initialState,
  reducers: {
    setModeConfig: (_, action) => ({ ...modeConstants[action.payload] }),
    clearModeConfig: () => initialState,
    decrementTotalLives: (state) => ({
      ...state,
      totalLives: state.totalLives - 1,
    })
  },
});

export const { setModeConfig, clearModeConfig, decrementTotalLives } = modeConfigReducer.actions;

export default modeConfigReducer.reducer;