import React, { useCallback, useEffect, useState } from 'react';
import { WON } from '../constants/gameFinishedResultConstants';
import firebaseApp from '../firebase';
import { MULTIPLAYER } from '../constants/modeConstants';
import MultiplayerLeaderboard from './Sidebar/MultiplayerLeaderboard';
import hasPlayerAlreadyScored from '../utils/hasPlayerAlreadyScored';

const GameFinish = ({
  modeConfig,
  multiplayerUser,
  handleResetGame,
  handleResetGameWithSameMode,
  gameFinishedResult
}) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const addUser = useCallback(async () => {
    const userRef = firebaseApp.collection('users')
      .doc(multiplayerUser.id);
    const user = await userRef.get();

    if (hasPlayerAlreadyScored(user, modeConfig)) {
      await userRef
        .set({
          name: multiplayerUser.name,
          time_seconds: modeConfig.remaining,
        });
    }
  }, [multiplayerUser.name, multiplayerUser.id, modeConfig]);

  useEffect(() => {
    if (gameFinishedResult === WON && modeConfig.mode === MULTIPLAYER) {
      addUser();
    }
  }, [gameFinishedResult, addUser, modeConfig.mode]);

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
        Beat your score?
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
          <MultiplayerLeaderboard currentUser={multiplayerUser} />
        )
      }
    </div>
  );
};

export default GameFinish;
