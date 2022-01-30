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
import MultiplayerConfig from './MultiplayerConfig';
import MultiplayerLeaderboard from './MultiplayerLeaderboard';

const SidebarContainer = ({
  mode,
  setMode,
  showCountdown,
  setShowCountdown,
  setMultiplayerUser,
  multiplayerUser,
}) => {
  const [startGame, setStartGame] = useState(false);
  const [userChoice, setUserChoice] = useState({});

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
    if (userChoice.isMultiplayer && multiplayerUser.length === 0) {
      return;
    }
    setMode(userChoice.value);
    setShowCountdown(true);
    setStartGame(false);
  };

  if (showCountdown) return null;

  if (mode && mode.props.modeConfig) {
    return mode;
  }

  if (userChoice.value === LEADERBOARD) {
    return (
      <div className="flex flex-col h-100 w-1/5">
        <MultiplayerLeaderboard />
        <button
          onClick={() => setUserChoice({})}
          className="mt-auto mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  if (userChoice.value === MULTIPLAYER) {
    return (
      <MultiplayerConfig
        contentProps={contentProps}
        setStartGame={setStartGame}
        setMultiplayerUser={setMultiplayerUser}
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
