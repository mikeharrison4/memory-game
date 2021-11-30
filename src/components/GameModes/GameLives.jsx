import React from 'react';

const GameLives = ({ modeConfig }) => {
  return (
    <div className="text-center">
      <h3 className="text-4xl">{modeConfig.remaining}</h3>
      <span>lives remaining</span>
    </div>
  );
};

export default GameLives;
