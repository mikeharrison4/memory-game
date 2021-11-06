import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FLIPPED } from '../constants';

const Tile = ({
  index,
  tile,
  tile: { icon: { iconName } },
  flippedTiles,
  setFlippedTiles,
  flipTile,
}) => {
  const handleClickTile = (e) => {
    const flippedTileId = e.currentTarget.id;
    if (flippedTiles.length && (flippedTileId === flippedTiles[0].id || flippedTiles.length === 2)) return; // returns early if the tile id is already flipped
    flipTile(flippedTileId);
    setFlippedTiles([...flippedTiles, { id: flippedTileId, iconName }]);
  };

  return (
    <div
      className="flip-tile flex flex-col h-32 m-2 cursor-pointer"
    >
      <div
        id={index}
        onClick={handleClickTile}
        className={`flip-tile-inner ${tile.flipped ? 'flipped' : ''} ${tile.matched ? 'pointer-events-none' : ''}`}
      >
        <div className="flip-tile-front ease-in bg-green-300 hover:bg-green-400" />
        <div className=
          {`flip-tile-back text-6xl flex justify-center items-center transition duration-1000 ease-in-out ${tile.matched ? 'bg-red-200' : 'bg-green-200'}`}
        >
          <FontAwesomeIcon icon={tile.icon} />
        </div>
      </div>
    </div>
  );
};

export default Tile;
