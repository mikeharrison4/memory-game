import { configureStore } from '@reduxjs/toolkit';
import tilesReducer from './reducers/tilesReducer';

export const store = configureStore({
  reducer: {
    tiles: tilesReducer,
  },
});