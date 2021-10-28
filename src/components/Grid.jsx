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
  faSquare,
  faSquare,
  faCircle,
  faCircle,
  faExclamationTriangle,
  faExclamationTriangle,
  faArrowCircleUp,
  faArrowCircleUp,
  faArrowUp,
  faArrowUp,
  faAddressBook,
  faAddressBook,
  faSchool,
  faSchool,
  faAppleAlt,
  faAppleAlt,
];

const shuffleTiles = (tiles) => {
  return tiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const Grid = () => {
  const [tiles, setTiles] = useState(shuffleTiles(tileData));
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    console.log(flippedCards);
  }, [flippedCards]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-2/3 grid grid-cols-4">
        { tiles.map((icon, i) => (
          <Tile
            key={i}
            icon={icon}
            flippedCards={flippedCards}
            setFlippedCards={setFlippedCards}
          />
        )) }
      </div>
    </div>
  );
};

export default Grid;
