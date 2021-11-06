import { FLIPPED, MATCHED } from '../constants';

export const shuffleTiles = (tiles) => {
  return tiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const delay = ms => new Promise(res => setTimeout(res, ms));

export const doTheyMatch = async (flippedTiles, updateTiles, setMatchedPairs) => {
  const tileOne = flippedTiles[0];
  const tileTwo = flippedTiles[1];
  let bool;
  let type;
  if (tileOne.iconName === tileTwo.iconName) {
    setMatchedPairs(prev => prev + 1);
    bool = true;
    type = MATCHED;
  } else {
    await delay(1000);
    bool = false;
    type = FLIPPED;
  }
  updateTiles(
    bool,
    type,
    tileOne.id,
    tileTwo.id,
  );
};