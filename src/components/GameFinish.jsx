import React from 'react';
import { WON } from '../constants/gameFinishedResultConstants';

const GameFinish = ({ modeConfig, handleResetGame, gameFinishedResult }) => {
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
