import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { animated } from 'react-spring';

const MultiplayerConfig = ({
  contentProps,
  setMultiplayerUser,
  setStartGame
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    setMultiplayerUser({
      id: '',
      name: ''
    });
  }, [setMultiplayerUser]);

  const handleStartGame = () => {
    setMultiplayerUser({ id: uuidv4(), name: input });
    setStartGame(true);
  };

  return (
    <animated.div
      className="flex flex-col justify-end"
      style={contentProps}
    >
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Enter your name"
          className="p-4 border border-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 w-64 m-2 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded disabled:opacity-50"
          onClick={handleStartGame}
          disabled={input.length === 0}
        >
          Start
        </button>
      </div>
    </animated.div>
  );
};

export default MultiplayerConfig;
