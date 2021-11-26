import React from 'react';
import { LOST } from '../../constants/gameFinishedResultConstants';

const GameLives = ({ modeConfig, setGameFinishedResult }) => {
  React.useEffect(() => {
    if (modeConfig.remaining === 0) {
      setGameFinishedResult(LOST);
    }
  }, [modeConfig.remaining]);

  return (
    <div className="text-center">
      <h3 className="text-4xl">{modeConfig.remaining}</h3>
      <span>lives remaining</span>
    </div>
  );
};

export default GameLives;
