import React from 'react';

const GameFinish = ({ setMatchedPairs, setTiles, tileData }) => {
  const handleClick = () => {
    setTiles(tileData);
    setMatchedPairs(0);
  };

  return (
    <div className='flex flex-col justify-center'>
      <h2>GAME Finished</h2>
      <button onClick={handleClick} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Play again
      </button>
    </div>
  );
};

export default GameFinish;
