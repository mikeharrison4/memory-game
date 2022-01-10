import React, { useState } from 'react';
import { modeConfigConstants, LIVES, TIMER, MULTIPLAYER } from './constants/modeConstants';
import Countdown from './components/Countdown/Countdown';
import GameLives from './components/GameModes/GameLives';
import GameTimer from './components/GameModes/GameTimer';
import Grid from './components/Grid';
import GameFinish from './components/GameFinish';
import { LOST } from './constants/gameFinishedResultConstants';
import SidebarContainer from './components/Sidebar/SidebarContainer';

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

  const getModeComponent = (mode) => {
    switch (mode) {
      case LIVES:
        return <GameLives modeConfig={modeConfig} />;
      case TIMER:
      case MULTIPLAYER:
        return (
          <GameTimer
            modeConfig={modeConfig}
            setModeConfig={setModeConfig}
            stopTimer={stopTimer}
          /> 
        );
      default:
        return;
    }
  };
  // const modes = {
  //   [LIVES]:
  //     <GameLives modeConfig={modeConfig} />,
  //   [TIMER]:
  //     <GameTimer
  //       modeConfig={modeConfig}
  //       setModeConfig={setModeConfig}
  //       stopTimer={stopTimer}
  //     />,
  //   [MULTIPLAYER]:
  //     <GameTimer
  //       modeConfig={modeConfig}
  //       setModeConfig={setModeConfig}
  //       stopTimer={stopTimer}
  //     />,
  // };

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
    <div className='h-screen flex items-center justify-center'>
      <div className="w-full">
        <div className={`flex justify-center ${modeConfig ? 'flex-col items-center' : ''}`}>
          <SidebarContainer
            mode={getModeComponent(mode)}
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
    </div>
  );
}

export default App;
