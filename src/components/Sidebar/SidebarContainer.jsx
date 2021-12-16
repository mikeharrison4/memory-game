import React, { useState } from 'react';
import { useSpring } from 'react-spring';
import { MULTIPLAYER, multiplayerGameModeButtons, singleGameModeButtons } from '../../constants/modeConstants';
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
  const [animationActive, setAnimationActive] = useState(false);
  const [localMode, setLocalMode] = useState('');
  const [multiplayerName, setMultiplayerName] = useState('');

  const contentProps = useSpring({
    marginLeft: animationActive ? -270 : 0,
    opacity: animationActive ? 0 : 1,
    onRest: () => handleOnRest(),
  });

  const handleModeClick = e => {
    setLocalMode(e.target.value);
    if (e.target.value !== MULTIPLAYER) setAnimationActive(true);
  };

  const handleOnRest = () => {
    if (localMode === MULTIPLAYER && multiplayerName.length === 0) return;
    setMode(localMode);
    setShowCountdown(true);
    setAnimationActive(false);
  };

  if (showCountdown || gameFinishedResult) return null;

  if (mode && mode.props.modeConfig) {
    return mode;
  }

  if (localMode === MULTIPLAYER) {
    return (
      <MultiplayerSidebar
        contentProps={contentProps}
        setAnimationActive={setAnimationActive}
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
          />
        )) }
      </div>
    </animated.div>
  );
};

export default SidebarContainer;
