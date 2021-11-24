import React from 'react';
import { setTiles } from '../../redux/reducers/tilesReducer';
import { shuffleTiles } from '../../utils';
import tileData from '../../constants/tileDateConstants';
import { resetMatchedPairs } from '../../redux/reducers/matchedPairsReducer';
import { setGameFinishedResult } from '../../redux/reducers/gameFinishedResultReducer';
import { useDispatch, useSelector } from 'react-redux';
import { clearModeConfig } from '../../redux/reducers/modeConfigReducer';
import { WON } from '../../constants/gameFinishedResultConstants';

const GameFinish = () => {
  const dispatch = useDispatch();
  const gameFinishedResult = useSelector(({ gameFinishedResult }) => gameFinishedResult);

  const handleResetGame = () => {
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
          <div>you lost!</div>
        )
      }
      <h2>GAME Finished</h2>
      <button onClick={handleResetGame} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Play again
      </button>
    </div>
  );
};

export default GameFinish;
