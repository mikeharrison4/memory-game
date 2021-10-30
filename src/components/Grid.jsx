import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import {
  faAddressBook, faAppleAlt,
  faArrowCircleUp,
  faArrowUp,
  faCircle,
  faExclamationTriangle, faSchool,
  faSquare
} from '@fortawesome/free-solid-svg-icons';

const tileData = [
  {
    // id: 0,
    icon: faSquare,
    flipped: false,
    matched: false,
  },
  {
    icon: faSquare,
    flipped: false,
    matched: false,
  },
  {
    icon: faCircle,
    flipped: false,
    matched: false,
  },
  {
    icon: faCircle,
    flipped: false,
    matched: false,
  },
  {
    icon: faExclamationTriangle,
    flipped: false,
    matched: false,
  },
  {
    icon: faExclamationTriangle,
    flipped: false,
    matched: false,
  },
  {
    icon: faArrowCircleUp,
    flipped: false,
    matched: false,
  },
  {
    icon: faArrowCircleUp,
    flipped: false,
    matched: false,
  },
  {
    icon: faArrowUp,
    flipped: false,
    matched: false,
  },
  {
    icon: faArrowUp,
    flipped: false,
    matched: false,
  },
  {
    icon: faAddressBook,
    flipped: false,
    matched: false,
  },
  {
    icon: faAddressBook,
    flipped: false,
    matched: false,
  },
  {
    icon: faSchool,
    flipped: false,
    matched: false,
  },
  {
    icon: faSchool,
    flipped: false,
    matched: false,
  },
  {
    icon: faAppleAlt,
    flipped: false,
    matched: false,
  },
  {
    icon: faAppleAlt,
    flipped: false,
    matched: false,
  },
];

const shuffleTiles = (tiles) => {
  return tiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const Grid = () => {
  const [startGame, setStartGame] = useState(false);
  const [tiles, setTiles] = useState(tileData);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    setStartGame(true);
    setTiles(shuffleTiles(tiles));
  }, [startGame]);

  const updateTiles = (id1, id2, bool, property) => {
    const newTiles = [...tiles];
    newTiles[id1][property] = bool;
    if (id2) newTiles[id2][property] = bool;
    setTiles(newTiles);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-2/3 grid grid-cols-4">
        { tiles.map((tile, i) => (
          <Tile
            index={i}
            key={i}
            tile={tile}
            flippedCards={flippedCards}
            setFlippedCards={setFlippedCards}
            updateTiles={updateTiles}
          />
        )) }
      </div>
    </div>
  );
};

export default Grid;
