export const LIVES = 'lives';
export const TIMER = 'timer';
export const MULTIPLAYER = 'multiplayer';

export const singleGameModeButtons = [
  {
    id: LIVES,
    label: 'Single player (lives mode)',
  },
  {
    id: TIMER,
    label: 'Single player (timer mode)',
  }
];

export const multiplayerGameModeButtons = [
  {
    id: MULTIPLAYER,
    label: 'Multiplayer (timer mode)',
  },
  {
    id: 'seeLeaderboard',
    label: 'See Leaderboard',
    className: 'text-sm'
  }
];

const generateWinningMessage = (remaining) => {
  return `Winner! You beat the game.. and with with ${remaining}`;
};

export const modeConfigConstants = {
  [LIVES]: {
    mode: LIVES,
    remaining: 2,
    winningMessage: (remaining) => `${generateWinningMessage(remaining)} lives left!`,
    losingMessage: 'You lost.. the lives mode is meant to be easy!'
  },
  [TIMER]: {
    mode: TIMER,
    remaining: 3, // seconds
    winningMessage: (remaining) => `${generateWinningMessage(remaining)} seconds left!`,
    losingMessage: 'You lost.. gotta try it again, surely?'
  },
  [MULTIPLAYER]: {
    mode: TIMER,
    remaining: 3, // seconds
    winningMessage: (remaining) => `${generateWinningMessage(remaining)} seconds left!`,
    losingMessage: 'You lost.. gotta try it again, surely? MULTIPLAYER'
  }
};