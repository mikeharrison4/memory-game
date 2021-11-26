import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { LIVES, TIMER } from '../constants/modeConstants';

const gameModeButtons = [
  {
    id: LIVES,
    label: 'Single player (lives mode)',
  },
  {
    id: TIMER,
    label: 'Single player (timer mode)',
  }
];

const ModeChoices = ({
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
      { gameModeButtons.map(({ id, label }) => (
        <animated.button
          style={contentProps}
          key={id}
          onClick={handleClick}
          value={id}
          className="bg-blue-500 w-64 text-3xl hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mb-2"
        >
          { label }
        </animated.button>
      )) }
    </div>
  );
};

export default ModeChoices;
