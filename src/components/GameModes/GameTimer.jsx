import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameFinishedResult } from '../../redux/reducers/gameFinishedResultReducer';
import { LOST } from '../../constants/gameFinishedResultConstants';

const GameTimer = () => {
  const dispatch = useDispatch();
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);
  const gameFinishedResult = useSelector(({ gameFinishedResult }) => gameFinishedResult);
  const [timeLeft, setTimeLeft] = useState(modeConfig.totalTime / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    if (gameFinishedResult) {
      clearInterval(interval);
    }
    if (timeLeft === 0) {
      dispatch(setGameFinishedResult(LOST));
    }
    return () => clearInterval(interval);
  }, [timeLeft, gameFinishedResult]);

  return (
    <div className="text-center">
      <h3 className="text-4xl">{timeLeft}</h3>
      <span>seconds remaining</span>
    </div>
  );
};

export default GameTimer;
