import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Tile from './Tile';
import GameFinish from './GameFinish';
import { FLIPPED, MATCHED } from '../constants/tileActionConstants';
import { delay, doTheyMatch, shuffleTiles } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setTiles } from '../redux/reducers/tilesReducer';
import { setFlippedTiles, clearFlippedTiles } from '../redux/reducers/flippedTilesReducer';
import { setMatchedPairs, resetMatchedPairs } from '../redux/reducers/matchedPairsReducer';
import celebration from '../assets/celebration.gif';
import tileData from '../constants/tileDateConstants';
import { decrementTotalLives } from '../redux/reducers/modeConfigReducer';

const Grid = () => {
  const dispatch = useDispatch();
  const tiles = useSelector(({ tiles }) => tiles);
  const flippedTiles = useSelector(({ flippedTiles }) => flippedTiles);
  const matchedPairs = useSelector(({ matchedPairs }) => matchedPairs);

  const [gameFinished, setGameFinished] = useState(false);

  const flipTile = (tileId) => {
    const newTiles = [...tiles];
    newTiles[tileId] = {
      ...newTiles[tileId],
      [FLIPPED]: true,
    };
    dispatch(setTiles(newTiles));
  };

  const resetGame = () => {
    dispatch(setTiles(shuffleTiles([...tileData])));
    dispatch(resetMatchedPairs());
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
    dispatch(setTiles(newTiles));
    dispatch(clearFlippedTiles());
  }, [tiles]);

  const isGameFinished = async () => {
    if ((matchedPairs + 1) === (tiles.length / 2)) {
      setGameFinished(true);
      await delay(3000);
    }
  };

  const checkPair = async () => {
    const tilesPair = { tileOne: flippedTiles[0].id, tileTwo: flippedTiles[1].id };
    const isMatched = await doTheyMatch(flippedTiles);
    if (!isMatched) {
      updatePair(false, FLIPPED, tilesPair);
      dispatch(decrementTotalLives());
      return;
    }
    updatePair(true, MATCHED, tilesPair);
    await isGameFinished();
    dispatch(setMatchedPairs());
  };

  useEffect(() => {
    if (flippedTiles.length !== 2) return;
    checkPair();
  }, [flippedTiles, matchedPairs]);

  return (
    <Fragment>
      { gameFinished && <img src={celebration} alt='Celebration' className="absolute z-10 w-full h-full" /> }
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
          <GameFinish handleResetGame={resetGame} />
        )
      }
    </Fragment>
  );
};

export default Grid;
