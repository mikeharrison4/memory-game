import React, { useEffect } from 'react';
import { LOST } from '../../constants/gameFinishedResultConstants';

const GameTimer = ({
  modeConfig,
  decrementRemaining,
  setGameFinishedResult
}) => {
  useEffect(() => {
    const timerSeconds = setInterval(() => {
      decrementRemaining({ ...modeConfig, remaining: modeConfig.remaining - 1 });
    }, 1000);
    if (modeConfig.remaining === 0) {
      clearInterval(timerSeconds);
      setGameFinishedResult(LOST);
    }
    return () => clearInterval(timerSeconds);
  }, [modeConfig.remaining]);

  return (
    <div className="text-center">
      <h3 className="text-4xl">{modeConfig.remaining}</h3>
      <span>seconds remaining</span>
    </div>
  );
};

export default GameTimer;
