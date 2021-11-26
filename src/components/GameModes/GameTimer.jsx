import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameFinishedResult } from '../../redux/reducers/gameFinishedResultReducer';
import { LOST } from '../../constants/gameFinishedResultConstants';
import { decrementRemaining, setTotalTimeLeft } from '../../redux/reducers/modeConfigReducer';

const GameTimer = () => {
  const dispatch = useDispatch();
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);
  const gameFinishedResult = useSelector(({ gameFinishedResult }) => gameFinishedResult);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(decrementRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [gameFinishedResult, dispatch]);

  useEffect(() => {
    if (modeConfig.remaining === 0) {
      dispatch(setGameFinishedResult(LOST));
    }
  }, [modeConfig.remaining, dispatch]);

  return (
    <div className="text-center">
      <h3 className="text-4xl">{modeConfig.remaining}</h3>
      <span>seconds remaining</span>
    </div>
  );
};

export default GameTimer;
