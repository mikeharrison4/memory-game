import React from 'react';
import { useSelector } from 'react-redux';

const GameLives = () => {
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);

  return (
    <div className="text-center">
      <h3 className="text-4xl">{modeConfig.totalLives}</h3>
      <span>remaining</span>
    </div>
  );
};

export default GameLives;
