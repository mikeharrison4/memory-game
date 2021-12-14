import React from 'react';
import { animated } from 'react-spring';

const ModeButton = ({ id, label, contentProps, handleClick, className = 'text-3xl' }) => {
  return (
    <animated.button
      style={contentProps}
      key={id}
      onClick={handleClick}
      value={id}
      className={`${className} bg-blue-500 w-64 m-2 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded`}
    >
      { label }
    </animated.button>
  );
};

export default ModeButton;
