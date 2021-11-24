import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from './Grid';
import GameConfiguration from '../GameCongifuration';
import Countdown from '../Countdown/Countdown';
import GameModesContainer from '../GameModes/GameModesContainer';

const GameContainer = () => {
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);
  const showCountdown = useSelector(({ showCountdown }) => showCountdown);
  const [modePicked, setModePicked] = useState('');

  return (
    <div className={`w-full flex justify-center items-center relative ${modeConfig ? 'flex-col' : ''}`}>
      { !modeConfig ?
        <GameConfiguration setModePicked={setModePicked} />
        : <GameModesContainer modePicked={modePicked} />
      }
      { showCountdown && <Countdown modePicked={modePicked} /> }
      <Grid />
    </div>
  );
};

export default GameContainer;
