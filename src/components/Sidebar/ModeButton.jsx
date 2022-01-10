import React from 'react';

const ModeButton = ({
  id,
  label,
  handleClick,
  className = 'text-3xl',
  isMultiplayer = false,
}) => {
  return (
    <button
      key={id}
      onClick={(e) => handleClick(e, isMultiplayer)}
      value={id}
      className={`${className} bg-blue-500 w-64 m-2 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded`}
    >
      { label }
    </button>
  );
};

export default ModeButton;
