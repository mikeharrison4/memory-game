import { createSlice } from '@reduxjs/toolkit';
import { modes } from '../../constants/modes';

const initialState = '';

export const modeConfigReducer = createSlice({
  name: 'modeConfig',
  initialState,
  reducers: {
    setModeConfig: (_, action) => ({ ...modes[action.payload] }),
    decrementTotalLives: (state) => ({
      ...state,
      totalLives: state.totalLives - 1,
    })
  },
});

export const { setModeConfig, decrementTotalLives } = modeConfigReducer.actions;

export default modeConfigReducer.reducer;