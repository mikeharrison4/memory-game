import React from 'react';
import { WON } from '../constants/gameFinishedResultConstants';
import { LIVES } from '../constants/modeConstants';

const GameFinish = ({ modeConfig, handleResetGame, gameFinishedResult }) => {
  let renderStr;

  if (gameFinishedResult === WON) {
    renderStr = (
      <div>{`Winner! Well done, you beat the game.. and with ${modeConfig.remaining} ${modeConfig.mode === LIVES ? 'lives' : 'seconds'} left!`}</div>
    );
  } else {
    renderStr = (
      <div>lost lol</div>
    );
  }

  return (
    <div className='flex flex-col justify-center z-20'>
      { renderStr }
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
