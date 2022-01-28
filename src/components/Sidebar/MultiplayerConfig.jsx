import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { animated } from 'react-spring';

const MultiplayerConfig = ({
  contentProps,
  multiplayerUser,
  setMultiplayerUser,
  setStartGame
}) => {
  useEffect(() => {
    setMultiplayerUser({
      id: '',
      name: ''
    });
  }, [setMultiplayerUser]);

  return (
    <animated.div
      className="flex flex-col justify-between"
      style={contentProps}
    >
      <div>
        <h2>Leaderboard</h2>
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Enter your name"
          className="p-4 border border-2"
          value={multiplayerUser.name}
          onChange={(e) => setMultiplayerUser({ name: e.target.value, id: uuidv4() })}
        />
        <button
          className="bg-blue-500 w-64 m-2 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded disabled:opacity-50"
          onClick={() => setStartGame(true)}
          disabled={multiplayerUser.name.length === 0}
        >
          Start
        </button>
      </div>
    </animated.div>
  );
};

export default MultiplayerConfig;
