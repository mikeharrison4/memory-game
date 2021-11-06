import React, { useState, useEffect, useCallback } from 'react';
import Tile from './Tile';
import { doTheyMatch, shuffleTiles } from '../utils';
import GameFinish from './GameFinish';
import { FLIPPED, MATCHED, tileData } from '../constants';
import celebration from '../assets/celebration.gif';

const Grid = () => {
  const [tiles, setTiles] = useState(tileData);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const flipTile = (tileId) => {
    const newTiles = [...tiles];
    newTiles[tileId] = {
      ...newTiles[tileId],
      [FLIPPED]: true,
    };
    setTiles(newTiles);
  };

  const updatePair = useCallback( (isFlippedOrMatched, type, { tileOne, tileTwo }) => {
    const newTiles = [...tiles];
    newTiles[tileOne] = {
      ...newTiles[tileOne],
      [type]: isFlippedOrMatched
    };
    newTiles[tileTwo] = {
      ...newTiles[tileTwo],
      [type]: isFlippedOrMatched
    };
    setTiles(newTiles);
    setFlippedTiles([]);
  }, [tiles]);

  useEffect(() => {
    if (flippedTiles.length !== 2) return;
    const tilesPair = { tileOne: flippedTiles[0].id, tileTwo: flippedTiles[1].id };
    (async function() {
      const isMatched = await doTheyMatch(flippedTiles);
      if (isMatched) {
        setTimeout(() => {
          setMatchedPairs(prev => prev + 1);
        }, 3000);
        updatePair(true, MATCHED, tilesPair);
      } else {
        updatePair(false, FLIPPED, tilesPair);
      }
    })();
  }, [flippedTiles, matchedPairs]);

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
                flipTile={flipTile}
                flippedTiles={flippedTiles}
                setFlippedTiles={setFlippedTiles}
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
