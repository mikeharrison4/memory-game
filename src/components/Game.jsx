import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from './Grid';
import GameConfiguration from './GameCongifuration';
import Countdown from './Countdown/Countdown';
import { getGameMode } from '../utils';

const Game = () => {
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);
  const showCountdown = useSelector(({ showCountdown }) => showCountdown);
  const [modePicked, setModePicked] = useState('');

  React.useEffect(() => {
    console.log(modeConfig);
  }, [modeConfig.totalLives]);

  return (
    <div className={`w-full flex justify-center items-center relative ${modeConfig ? 'flex-col' : ''}`}>
      { !modeConfig ? <GameConfiguration setModePicked={setModePicked} /> : getGameMode(modePicked) }
      { showCountdown && (
        <Countdown modePicked={modePicked} />
      ) }
      <Grid />
    </div>
  );
};

export default Game;
