import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tile = ({ 
  icon,
  icon: { iconName },
  flippedCards,
  setFlippedCards,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleOnClick = () => {
    setFlipped(!flipped);
    setFlippedCards(flippedCards.concat(iconName));
  };

  return (
    <div
      className="flip-tile flex flex-col h-32 m-2 cursor-pointer"
      onClick={handleOnClick}
    >
      <div className={`flip-tile-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-tile-front bg-green-300" />
        <div className="flip-tile-back bg-green-200 text-6xl flex justify-center items-center">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>

    </div>
  );
};

export default Tile;
