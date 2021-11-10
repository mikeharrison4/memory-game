import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Tile from './Tile';
import GameFinish from './GameFinish';
import { FLIPPED, MATCHED, tileData } from '../constants';
import { delay, doTheyMatch, shuffleTiles } from '../utils';
import celebration from '../assets/celebration.gif';

const Grid = () => {
  const [tiles, setTiles] = useState(shuffleTiles([...tileData]));
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const flipTile = (tileId) => {
    const newTiles = [...tiles];
    newTiles[tileId] = {
      ...newTiles[tileId],
      [FLIPPED]: true,
    };
    setTiles(newTiles);
  };

  const resetGame = () => {
    setTiles(shuffleTiles([...tileData])  );
    setMatchedPairs(0);
    setGameFinished(false);
  };

  const updatePair = useCallback( (isFlippedOrMatched, type, { tileOne, tileTwo }) => {
    const newTiles = [...tiles];
    [tileOne, tileTwo].forEach(tile => {
      newTiles[tile] = {
        ...newTiles[tile],
        [type]: isFlippedOrMatched,
      };
    });
    setTiles(newTiles);
    setFlippedTiles([]);
  }, [tiles]);

  const checkTiles = async () => {
    const tilesPair = { tileOne: flippedTiles[0].id, tileTwo: flippedTiles[1].id };
    const isMatched = await doTheyMatch(flippedTiles);
    if (!isMatched) {
      updatePair(false, FLIPPED, tilesPair);
      return;
    }
    updatePair(true, MATCHED, tilesPair);
    if ((matchedPairs + 1) === (tiles.length / 2)) {
      setGameFinished(true);
      await delay(3000);
    }
    setMatchedPairs(prev => prev + 1);
  };

  useEffect(() => {
    if (flippedTiles.length !== 2) return;
    checkTiles();
  }, [flippedTiles, matchedPairs]);

  return (
    <Fragment>
      { gameFinished && <img src={celebration} alt='' className="absolute z-10 w-full h-full" /> }
      { matchedPairs !== (tiles.length / 2)
        ? (
          <div className="w-6/12 grid grid-cols-4">
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
            handleResetGame={resetGame}
          />
        )
      }
    </Fragment>
  );
};

export default Grid;
