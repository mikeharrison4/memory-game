import React, { useEffect, useState } from 'react';
import { WON } from '../constants/gameFinishedResultConstants';
import firebaseApp from '../firebase';
import { MULTIPLAYER } from '../constants/modeConstants';
import MultiplayerLeaderboard from './Sidebar/MultiplayerLeaderboard';

const GameFinish = ({
  modeConfig,
  multiplayerName,
  handleResetGame,
  handleResetGameWithSameMode,
  gameFinishedResult
}) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

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
        onClick={handleResetGameWithSameMode}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Play again
      </button>
      <button
        onClick={handleResetGame}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Pick a new mode
      </button>
      { modeConfig.mode === MULTIPLAYER 
        && (
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            { `${showLeaderboard ? 'Hide Leaderboard' : 'See Leaderboard'}` }
          </button>
        )
      }
      { showLeaderboard
        && (
          <MultiplayerLeaderboard />
        )
      }
    </div>
  );
};

export default GameFinish;
