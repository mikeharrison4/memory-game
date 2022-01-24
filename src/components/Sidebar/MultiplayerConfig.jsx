import React, { useEffect } from 'react';
import { animated } from 'react-spring';

const MultiplayerConfig = ({
  contentProps,
  multiplayerName,
  setMultiplayerName,
  setStartGame
}) => {
  useEffect(() => {
    setMultiplayerName('');
  }, []);

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
          value={multiplayerName}
          onChange={(e) => setMultiplayerName(e.target.value)}
        />
        <button
          className="bg-blue-500 w-64 m-2 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded disabled:opacity-50"
          onClick={() => setStartGame(true)}
          disabled={multiplayerName.length === 0}
        >
          Start
        </button>
      </div>
    </animated.div>
  );
};

export default MultiplayerConfig;
