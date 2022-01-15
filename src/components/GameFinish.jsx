import React, { useEffect } from 'react';
import { WON } from '../constants/gameFinishedResultConstants';
import firebaseApp from '../firebase';
import { MULTIPLAYER } from '../constants/modeConstants';

const GameFinish = ({
  modeConfig,
  multiplayerName,
  handleResetGame,
  gameFinishedResult
}) => {
  useEffect(() => {
    if (gameFinishedResult === WON && modeConfig.mode === MULTIPLAYER) {
      firebaseApp
        .collection('users')
        .add({
          name: multiplayerName,
          time_seconds: modeConfig.remaining,
        });
    }
  }, []);

  return (
    <div className='flex flex-col justify-center z-20'>
      { gameFinishedResult === WON
        ? modeConfig.winningMessage(modeConfig.remaining)
        : modeConfig.losingMessage
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
