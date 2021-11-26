import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from './Grid';
import ModeChoices from './ModeChoices';
import Countdown from './Countdown/Countdown';
import { renderMode } from '../utils';

const GameContainer = () => {
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);
  const showCountdown = useSelector(({ showCountdown }) => showCountdown);
  const gameFinishedResult = useSelector(({ gameFinishedResult }) => gameFinishedResult);
  const [modePicked, setModePicked] = useState('');

  return (
    <div className={`w-full flex justify-center items-center relative ${modeConfig ? 'flex-col' : ''}`}>
      { !modeConfig
        ? <ModeChoices setModePicked={setModePicked} />
        : (
          !gameFinishedResult && renderMode(modePicked)
        )
      }
      { showCountdown && <Countdown modePicked={modePicked} /> }
      <Grid />
    </div>
  );
};

export default GameContainer;
