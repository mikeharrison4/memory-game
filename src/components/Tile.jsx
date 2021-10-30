import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const doTheyMatch = (flippedCards, updateTiles) => {
  if (flippedCards[0].iconName === flippedCards[1].iconName) {
    updateTiles(flippedCards[0].id, flippedCards[1].id, true, 'matched');
  } else {
    setTimeout(() => {
      updateTiles(flippedCards[0].id, flippedCards[1].id, false, 'flipped');
    }, 1500);
  }
};

const Tile = ({
  index,
  tile,
  tile: { icon: { iconName } },
  flippedCards,
  setFlippedCards,
  updateTiles,
}) => {
  const handleOnClick = (e) => {
    const flippedTileId = e.currentTarget.id;
    if (flippedCards.length && (flippedTileId === flippedCards[0].id || flippedCards.length === 2)) return; // returns early if the tile id is already flipped
    updateTiles(flippedTileId, null, true, 'flipped');
    setFlippedCards(
      flippedCards.concat({ id: flippedTileId, iconName })
    );
  };

  useEffect(() => {
    if (flippedCards.length !== 2) return;
    doTheyMatch(flippedCards, updateTiles);
    setFlippedCards([]);
  }, [flippedCards, updateTiles]);

  return (
    <div
      className="flip-tile flex flex-col h-32 m-2 cursor-pointer"
    >
      <div
        id={index}
        onClick={handleOnClick}
        className={`flip-tile-inner ${tile.flipped ? 'flipped' : ''} ${tile.matched ? 'pointer-events-none' : ''}`}
      >
        <div className="flip-tile-front bg-green-300" />
        <div className={`flip-tile-back text-6xl flex justify-center items-center ${tile.matched ? 'bg-red-200' : 'bg-green-200'}`}>
          <FontAwesomeIcon icon={tile.icon} />
        </div>
      </div>

    </div>
  );
};

export default Tile;
