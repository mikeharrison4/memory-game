import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameFinishedResult } from '../../redux/reducers/gameFinishedResultReducer';
import { LOST } from '../../constants/gameFinishedResultConstants';

const GameLives = () => {
  const dispatch = useDispatch();
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);

  React.useEffect(() => {
    if (modeConfig.totalLives === 0) {
      dispatch(setGameFinishedResult(LOST));
    }
  }, [modeConfig.totalLives]);

  return (
    <div className="text-center">
      <h3 className="text-4xl">{modeConfig.totalLives}</h3>
      <span>lives remaining</span>
    </div>
  );
};

export default GameLives;
