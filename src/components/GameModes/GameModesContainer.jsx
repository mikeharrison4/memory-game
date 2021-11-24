import React, { Fragment } from 'react';
import { getGameMode } from '../../utils';
import { useSelector } from 'react-redux';
import { LOST } from '../../constants/gameFinishedResultConstants';

const GameModesContainer = ({ modePicked }) => {
  const gameFinishedResult = useSelector(({ gameFinishedResult }) => gameFinishedResult);

  if (gameFinishedResult === LOST) return null;

  return (
    <Fragment>
      { getGameMode(modePicked) }
    </Fragment>
  );
};

export default GameModesContainer;
