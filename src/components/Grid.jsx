import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Tile from './Tile';
import { FLIPPED, MATCHED } from '../constants/tileActionConstants';
import { doTheyMatch } from '../utils';
import tileData from '../constants/tileDateConstants';
import { LIVES, modeConstants } from '../constants/modeConstants';
import GameFinish from './GameFinish';

// const Grid = () => {
//   const dispatch = useDispatch();
//   const tiles = useSelector(({ tiles }) => tiles);
//   const flippedTiles = useSelector(({ flippedTiles }) => flippedTiles);
//   const matchedPairs = useSelector(({ matchedPairs }) => matchedPairs);
//   const gameFinishedResult = useSelector(({ gameFinishedResult }) => gameFinishedResult);
//   const [showCelebration, setShowCelebration] = useState(false);
//
//   const flipTile = (tileId) => {
//     const newTiles = [...tiles];
//     newTiles[tileId] = {
//       ...newTiles[tileId],
//       [FLIPPED]: true,
//     };
//     dispatch(setTiles(newTiles));
//   };
//
//   const updatePair = useCallback( (isFlippedOrMatched, type, { tileOne, tileTwo }) => {
//     const newTiles = [...tiles];
//     [tileOne, tileTwo].forEach(tile => {
//       newTiles[tile] = {
//         ...newTiles[tile],
//         [type]: isFlippedOrMatched,
//       };
//     });
//     dispatch(setTiles(newTiles));
//     dispatch(clearFlippedTiles());
//   }, [tiles, dispatch]);
//
//   const checkPair = async () => {
//     const tilesPair = { tileOne: flippedTiles[0].id, tileTwo: flippedTiles[1].id };
//     const isMatched = await doTheyMatch(flippedTiles);
//     if (!isMatched) {
//       updatePair(false, FLIPPED, tilesPair);
//       dispatch(decrementRemaining());
//       return;
//     }
//     updatePair(true, MATCHED, tilesPair);
//   };
//
//   // Listen for flippedTiles and check if matched
//   useEffect(() => {
//     if (flippedTiles.length !== 2) return;
//     checkPair();
//     dispatch(setMatchedPairs());
//   }, [flippedTiles, dispatch]);
//
//   // Listen for matchedPairs and check if game is won
//   useEffect(() => {
//     if (matchedPairs === 1) {
//       setShowCelebration(true);
//       setTimeout(() => {
//         dispatch(setGameFinishedResult(WON));
//       }, 3000);
//     }
//   }, [matchedPairs, dispatch, tiles.length]);
//
//   if (gameFinishedResult) {
//     return <GameFinish setShowCelebration={setShowCelebration} />;
//   }
//
//   return (
//     <Fragment>
//       { showCelebration && <img src={celebration} alt='Celebration' className="absolute z-10 w-full h-full" /> }
//       <div className="w-6/12 grid grid-cols-4">
//         { tiles.map((tile, i) => (
//           <Tile
//             index={i}
//             key={i}
//             tile={tile}
//             flipTile={flipTile}
//             flippedTiles={flippedTiles}
//             setFlippedTiles={setFlippedTiles}
//           />
//         )) }
//       </div>
//     </Fragment>
//   );
// };

const Grid = ({
  decrementRemaining,
  modeConfig,
  gameFinishedResult,
  gameFinish,
  ...rest
}) => {
  const [tiles, setTiles] = useState([...tileData]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

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
      setMatchedPairs(prev => prev - 1);
      modeConfig.mode === LIVES && decrementRemaining({ ...modeConfig, remaining: modeConfig.remaining - 1 });
      return;
    }
    updatePair(true, MATCHED, tilesPair);
  };

  useEffect(() => {
    if (flippedTiles.length !== 2) return;
    checkPair();
    setMatchedPairs(prev => prev + 1);
  }, [flippedTiles]);

  if (gameFinishedResult) {
    return gameFinish;
  }

  return (
    <Fragment>
      {/*{ showCelebration && <img src={celebration} alt='Celebration' className="absolute z-10 w-full h-full" /> }*/}
      <div className="w-6/12 grid grid-cols-4">
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
