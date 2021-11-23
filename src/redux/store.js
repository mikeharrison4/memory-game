import { configureStore } from '@reduxjs/toolkit';
import tilesReducer from './reducers/tilesReducer';
import flippedTilesReducer from './reducers/flippedTilesReducer';
import matchedPairsReducer from './reducers/matchedPairsReducer';
import modeConfigReducer from './reducers/modeConfigReducer';
import countdownReducer from './reducers/countdownReducer';

export const store = configureStore({
  reducer: {
    modeConfig: modeConfigReducer,
    showCountdown: countdownReducer,
    tiles: tilesReducer,
    flippedTiles: flippedTilesReducer,
    matchedPairs: matchedPairsReducer
  },
});