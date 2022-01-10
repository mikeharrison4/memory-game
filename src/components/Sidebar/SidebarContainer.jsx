import React, { useState } from 'react';
import { useSpring } from 'react-spring';
import {
  LEADERBOARD,
  MULTIPLAYER,
  multiplayerGameModeButtons,
  singleGameModeButtons
} from '../../constants/modeConstants';
import ModeButton from './ModeButton';
import { animated } from 'react-spring';
import MultiplayerSidebar from './MultiplayerSidebar';

const SidebarContainer = ({
  mode,
  setMode,
  showCountdown,
  setShowCountdown,
  gameFinishedResult
}) => {
  const [startGame, setStartGame] = useState(false);
  const [userChoice, setUserChoice] = useState({});
  const [multiplayerName, setMultiplayerName] = useState('');

  const contentProps = useSpring({
    marginLeft: startGame ? -270 : 0,
    opacity: startGame ? 0 : 1,
    onRest: () => handleOnRest(),
  });

  const handleModeClick = (e, isMultiplayer) => {
    setUserChoice({
      value: e.target.value,
      isMultiplayer
    });
    if (!isMultiplayer) {
      setStartGame(true);
    }
  };

  const handleOnRest = () => {
    console.log(userChoice);
    if (userChoice.isMultiplayer && multiplayerName.length === 0) {
      return;
    }
    setMode(userChoice.value);
    setShowCountdown(true);
    setStartGame(false);
  };

  // if (showCountdown || gameFinishedResult) return null; // don't think i need this??
  if (showCountdown) return null;

  if (mode && mode.props.modeConfig) {
    return mode;
  }

  if (userChoice.value === LEADERBOARD) {
    return <div>hello</div>;
  }

  if (userChoice.value === MULTIPLAYER) {
    return (
      <MultiplayerSidebar
        contentProps={contentProps}
        setStartGame={setStartGame}
        setMultiplayerName={setMultiplayerName}
        multiplayerName={multiplayerName}
      />
    );
  }

  return (
    <animated.div
      className="flex flex-col"
      style={contentProps}
    >
      <div className="flex flex-col">
        { singleGameModeButtons.map(({ id, label }) => (
          <ModeButton
            key={id}
            id={id}
            label={label}
            contentProps={contentProps}
            handleClick={handleModeClick}
          />
        )) }
      </div>
      <div className="flex flex-col mt-auto">
        { multiplayerGameModeButtons.map(({ id, label, className }) => (
          <ModeButton
            key={id}
            id={id}
            label={label}
            contentProps={contentProps}
            handleClick={handleModeClick}
            className={className}
            isMultiplayer={true}
          />
        )) }
      </div>
    </animated.div>
  );
};

export default SidebarContainer;
