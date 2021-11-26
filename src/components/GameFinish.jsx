import React from 'react';
import { setTiles } from '../redux/reducers/tilesReducer';
import { shuffleTiles } from '../utils';
import tileData from '../constants/tileDateConstants';
import { resetMatchedPairs } from '../redux/reducers/matchedPairsReducer';
import { setGameFinishedResult } from '../redux/reducers/gameFinishedResultReducer';
import { useDispatch, useSelector } from 'react-redux';
import { clearModeConfig } from '../redux/reducers/modeConfigReducer';
import { WON } from '../constants/gameFinishedResultConstants';
import { LIVES } from '../constants/modeConstants';

const GameFinish = ({ setShowCelebration }) => {
  const dispatch = useDispatch();
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);
  const gameFinishedResult = useSelector(({ gameFinishedResult }) => gameFinishedResult);
  let renderStr;

  const handleResetGame = () => {
    setShowCelebration(false);
    dispatch(setTiles(shuffleTiles([...tileData])));
    dispatch(resetMatchedPairs());
    dispatch(clearModeConfig());
    dispatch(setGameFinishedResult(null));
  };

  return (
    <div className='flex flex-col justify-center z-20'>
      { gameFinishedResult === WON
        ? (
          <div>you won!</div>
        ) : (
          <div>
            <h2>
              {`Ahh no! You lost.. but only with ${modeConfig.remaining}`}</h2>
          </div>
        )
      }
      <button
        onClick={handleResetGame}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Play again
      </button>
    </div>
  );
};

export default GameFinish;
