import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { setShowCountdown } from '../redux/reducers/countdownReducer';
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

const ModeChoices = ({ setModePicked }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const contentProps = useSpring({
    marginLeft: active ? -1000 : 0,
  });

  const handleClick = (e) => {
    setModePicked(e.target.value);
    setActive(!active);
    dispatch(setShowCountdown(true));
  };

  return (
    <div className="flex flex-col mr-4">
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
