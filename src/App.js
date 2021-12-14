import React, { useState } from 'react';
import ModeChoices from './components/ModeChoices';
import { modeConfigConstants } from './constants/modeConstants';
import Countdown from './components/Countdown/Countdown';
import GameLives from './components/GameModes/GameLives';
import GameTimer from './components/GameModes/GameTimer';
import Grid from './components/Grid';
import GameFinish from './components/GameFinish';
import { LOST } from './constants/gameFinishedResultConstants';

function App() {
  const [modeConfig, setModeConfig] = useState(null);
  const [mode, setMode] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [gameFinishedResult, setGameFinishedResult] = useState(null);
  const [stopTimer, setStopTimer] = useState(false);

  React.useEffect(() => {
    setModeConfig(modeConfigConstants[mode]);
  }, [mode]);

  React.useEffect(() => {
    if (modeConfig && modeConfig.remaining === 0) {
      setGameFinishedResult(LOST);
    }
  }, [modeConfig]);

  const modes = {
    lives:
      <GameLives modeConfig={modeConfig} />,
    timer:
      <GameTimer
        modeConfig={modeConfig}
        setModeConfig={setModeConfig}
        stopTimer={stopTimer}
      />
  };

  if (gameFinishedResult) {
    const handleResetGame = () => {
      setMode(null);
      setModeConfig(null);
      setGameFinishedResult(null);
      setStopTimer(false);
    };

    return (
      <div className="h-screen flex justify-center items-center">
        <GameFinish
          modeConfig={modeConfig}
          gameFinishedResult={gameFinishedResult}
          handleResetGame={handleResetGame}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <div className={`w-full flex justify-center items-center relative ${modeConfig ? 'flex-col' : ''}`}>
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
          setModeConfig={setModeConfig}
          showCountdown={showCountdown}
          setGameFinishedResult={setGameFinishedResult}
          setStopTimer={setStopTimer}
        />
      </div>
    </div>
  );
}

export default App;
