import { FLIPPED, MATCHED } from '../constants';

export const shuffleTiles = (tiles) => {
  return tiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const doTheyMatch = (flippedTiles, updateTiles, setMatchedPairs) => {
  const tileOne = flippedTiles[0];
  const tileTwo = flippedTiles[1];
  let bool;
  let type;
  if (tileOne.iconName === tileTwo.iconName) {
    setMatchedPairs(prev => prev + 1);
    bool = true;
    type = MATCHED;
  } else {
    bool = false;
    type = FLIPPED;
  }
  setTimeout(() => {
    updateTiles(
      tileOne.id,
      tileTwo.id,
      bool,
      type,
    );
  }, 1000);
};