import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Tile from './Tile';
import { FLIPPED, MATCHED } from '../constants/tileActionConstants';
import { doTheyMatch, shuffleTiles } from '../utils';
import tileData from '../constants/tileDateConstants';
import { LIVES } from '../constants/modeConstants';
import celebration from '../assets/celebration.gif';
import { WON } from '../constants/gameFinishedResultConstants';

const Grid = ({
  modeConfig,
  setModeConfig,
  setGameFinishedResult,
  setStopTimer,
  ...rest
}) => {
  const [tiles, setTiles] = useState([...shuffleTiles(tileData)]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

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
    [tileOne, tileTwo].forEach(tile => {
      newTiles[tile] = {
        ...newTiles[tile],
        [type]: isFlippedOrMatched,
      };
    });
    setTiles(newTiles);
    setFlippedTiles([]);
  }, [tiles]);

  const checkPair = async () => {
    const tilesPair = { tileOne: flippedTiles[0].id, tileTwo: flippedTiles[1].id };
    const isMatched = await doTheyMatch(flippedTiles);
    if (!isMatched) {
      updatePair(false, FLIPPED, tilesPair);
      modeConfig.mode === LIVES && setModeConfig({ ...modeConfig, remaining: modeConfig.remaining - 1 });
      return;
    }
    setMatchedPairs(prev => prev + 1);
    updatePair(true, MATCHED, tilesPair);
  };

  // Listen for flippedTiles and check if matched
  useEffect(() => {
    if (flippedTiles.length !== 2) return;
    checkPair();
  }, [flippedTiles]);

  // Listen for matchedPairs and check if game is won
  useEffect(() => {
    console.log(matchedPairs);
    if (matchedPairs === (tiles.length / 2)) {
      setShowCelebration(true);
      setStopTimer(true);
      setTimeout(() => {
        setMatchedPairs(0);
        setTiles([...tileData]);
      }, 3000);
      return () => setGameFinishedResult(WON);
    }
  }, [matchedPairs]);

  return (
    <Fragment>
      { showCelebration && <img src={celebration} alt='Celebration' className="absolute z-10 w-full h-full" /> }
      <div className="ml-2 w-6/12 grid grid-cols-4">
        { tiles.map((tile, i) => (
          <Tile
            index={i}
            key={i}
            tile={tile}
            flipTile={flipTile}
            flippedTiles={flippedTiles}
            setFlippedTiles={setFlippedTiles}
            modeConfig={modeConfig}
            {...rest}
          />
        )) }
      </div>
    </Fragment>
  );
};

export default Grid;
