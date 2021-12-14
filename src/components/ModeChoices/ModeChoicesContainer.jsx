import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { multiplayerGameModeButtons, singleGameModeButtons } from '../../constants/modeConstants';
import ModeButton from './ModeButton';

const ModeChoicesContainer = ({
  mode,
  setMode,
  showCountdown,
  setShowCountdown,
  gameFinishedResult
}) => {
  const [animationActive, setAnimationActive] = useState(false);
  const [localMode, setLocalMode] = useState('');

  const contentProps = useSpring({
    marginLeft: animationActive ? -400 : 0,
    opacity: animationActive ? 0 : 1,
    onRest: () => handleOnRest(),
  });

  const handleClick = e => {
    setLocalMode(e.target.value);
    setAnimationActive(!animationActive);
  };

  const handleOnRest = () => {
    setMode(localMode);
    setShowCountdown(true);
  };

  if (showCountdown || gameFinishedResult) return null;

  if (mode && mode.props.modeConfig) {
    return mode;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        { singleGameModeButtons.map(({ id, label }) => (
          <ModeButton
            id={id}
            label={label}
            contentProps={contentProps}
            handleClick={handleClick}
          />
        )) }
      </div>
      <div className="flex flex-col mt-auto">
        { multiplayerGameModeButtons.map(({ id, label, className }) => (
          <ModeButton
            id={id}
            label={label}
            contentProps={contentProps}
            handleClick={handleClick}
            className={className}
          />
        )) }
      </div>
    </div>
  );
};

export default ModeChoicesContainer;
