export const shuffleTiles = (tiles) => {
  return tiles
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const delay = ms => new Promise(res => setTimeout(res, ms));

export const doTheyMatch = async (flippedTiles) => {
  const tileOne = flippedTiles[0];
  const tileTwo = flippedTiles[1];
  if (tileOne.iconName === tileTwo.iconName) {
    return true;
  }
  await delay(750); // time it takes for the tiles to flip back over when they did not match
  return false;
};