import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameFinishedResult } from '../../redux/reducers/gameFinishedResultReducer';
import { LOST } from '../../constants/gameFinishedResultConstants';

const GameLives = () => {
  const dispatch = useDispatch();
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);

  React.useEffect(() => {
    if (modeConfig.remaining === 0) {
      dispatch(setGameFinishedResult(LOST));
    }
  }, [modeConfig.remaining, dispatch]);

  return (
    <div className="text-center">
      <h3 className="text-4xl">{modeConfig.remaining}</h3>
      <span>lives remaining</span>
    </div>
  );
};

export default GameLives;
