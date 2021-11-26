import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setFlippedTiles } from '../redux/reducers/flippedTilesReducer';

const Tile = ({
  index,
  tile: {
    icon,
    flipped,
    matched
  },
  flipTile,
}) => {
  const dispatch = useDispatch();
  const flippedTiles = useSelector(({ flippedTiles }) => flippedTiles);
  const modeConfig = useSelector(({ modeConfig }) => modeConfig);

  const handleClickTile = (e) => {
    const flippedTileId = e.currentTarget.id;
    if (flippedTiles.length && (flippedTileId === flippedTiles[0].id || flippedTiles.length === 2)) return; // returns early if the tile id is already flipped
    flipTile(flippedTileId);
    dispatch(setFlippedTiles( { id: flippedTileId, iconName: icon.iconName }));
  };

  return (
    <div className="flip-tile flex flex-col h-32 m-2 cursor-pointer">
      <button
        id={index}
        onClick={handleClickTile}
        className={`flip-tile-inner ${flipped ? 'flipped' : ''} ${matched ? 'pointer-events-none' : ''}`}
        disabled={!modeConfig}
      >
        <div className={`flip-tile-front ease-in ${modeConfig ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300'}`} />
        <div
          className={`flip-tile-back text-6xl flex justify-center items-center transition duration-1000 ease-in-out ${matched ? 'bg-red-200' : 'bg-green-200'}`}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
      </button>
    </div>
  );
};

export default Tile;
