import React, { useState } from 'react';
import GameContainer from './components/GameContainer';
import ModeChoices from './components/ModeChoices';
import { modeConstants } from './constants/modeConstants';
import Countdown from './components/Countdown/Countdown';
import GameLives from './components/GameModes/GameLives';
import GameTimer from './components/GameModes/GameTimer';
import Grid from './components/Grid';
import GameFinish from './components/GameFinish';

function App() {
  const [modeConfig, setModeConfig] = useState(null);
  const [mode, setMode] = useState('');
  const [showCountdown, setShowCountdown] = useState(false);
  const [gameFinishedResult, setGameFinishedResult] = useState('');

  React.useEffect(() => {
    setModeConfig(modeConstants[mode]);
  }, [mode]);

  const gameFinish = <GameFinish modeConfig={modeConfig} gameFinishedResult={gameFinishedResult} />;

  const modes = {
    lives:
      <GameLives
        modeConfig={modeConfig}
        setGameFinishedResult={setGameFinishedResult}
      />,
    timer:
      <GameTimer
        modeConfig={modeConfig}
        decrementRemaining={setModeConfig}
        setGameFinishedResult={setGameFinishedResult}
      />
  };

  return (
    <div className="h-screen flex">
      <div className={`w-full flex justify-center items-center relative ${modeConfig ? 'flex-col' : ''}`}>
        <GameContainer>
          <ModeChoices
            mode={modes[mode]}
            setMode={setMode}
            setShowCountdown={setShowCountdown}
            showCountdown={showCountdown}
            gameFinishedResult={gameFinishedResult}
          />
          { showCountdown && <Countdown setShowCountdown={setShowCountdown} /> }
          <Grid
            modeConfig={modeConfig}
            decrementRemaining={setModeConfig}
            showCountdown={showCountdown}
            gameFinishedResult={gameFinishedResult}
            gameFinish={gameFinish}
          />
        </GameContainer>
      </div>
    </div>
  );
}

export default App;
