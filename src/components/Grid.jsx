import React, { useState, useEffect, useCallback } from 'react';
import Tile from './Tile';
import { delay, doTheyMatch, shuffleTiles } from '../utils';
import GameFinish from './GameFinish';
import { tileData } from '../constants';

const Grid = () => {
  const [tiles, setTiles] = useState(tileData);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const updateTiles = useCallback(async (isFlippedOrMatched, type, tileOneId, tileTwoId) => {
    const newTiles = [...tiles];
    newTiles[tileOneId] = {
      ...newTiles[tileOneId],
      [type]: isFlippedOrMatched
    };
    if (tileTwoId) {
      newTiles[tileTwoId] = {
        ...newTiles[tileTwoId],
        [type]: isFlippedOrMatched
      };
    }
    setTiles(newTiles);
  }, [tiles]);

  useEffect(() => {
    if (flippedTiles.length !== 2) return;
    doTheyMatch(flippedTiles, updateTiles, setMatchedPairs, setFlippedTiles)
      .then(() => setFlippedTiles([]));
  }, [flippedTiles]);

  return (
    <div className="w-full flex justify-center items-center">
      { matchedPairs !== (tiles.length / 2)
        ? (
          <div className="w-2/3 grid grid-cols-4">
            { tiles.map((tile, i) => (
              <Tile
                index={i}
                key={i}
                tile={tile}
                flippedTiles={flippedTiles}
                setFlippedTiles={setFlippedTiles}
                updateTiles={updateTiles}
              />
            )) }
          </div>
        ) : (
          <GameFinish
            setMatchedPairs={setMatchedPairs}
            setTiles={setTiles}
            tileData={tileData}
          />
        )
      }
    </div>
  );
};

export default Grid;
