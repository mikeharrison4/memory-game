import React, { useEffect } from 'react';

const GameTimer = ({
  modeConfig,
  setModeConfig,
  stopTimer,
}) => {
  useEffect(() => {
    const timerSeconds = setInterval(() => {
      setModeConfig({ ...modeConfig, remaining: modeConfig.remaining - 1 });
    }, 1000);
    if (stopTimer) clearInterval(timerSeconds);
    return () => clearInterval(timerSeconds);
  }, [modeConfig, stopTimer]);

  return (
    <div className="text-center">
      <h3 className="text-4xl">{modeConfig.remaining}</h3>
      <span>seconds remaining</span>
    </div>
  );
};

export default GameTimer;
