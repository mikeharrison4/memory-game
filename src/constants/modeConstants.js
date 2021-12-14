export const LIVES = 'lives';
export const TIMER = 'timer';

export const gameModeButtons = [
  {
    id: LIVES,
    label: 'Single player (lives mode)',
  },
  {
    id: TIMER,
    label: 'Single player (timer mode)',
  }
];

const generateWinningMessage = (remaining) => {
  return `Winner! You beat the game.. and with with ${remaining}`;
};

export const modeConfigConstants = {
  lives: {
    mode: LIVES,
    remaining: 2,
    winningMessage: (remaining) => `${generateWinningMessage(remaining)} lives left!`,
    losingMessage: 'You lost.. the lives mode is meant to be easy!'
  },
  timer: {
    mode: TIMER,
    remaining: 3, // seconds
    winningMessage: (remaining) => `${generateWinningMessage(remaining)} seconds left!`,
    losingMessage: 'You lost.. gotta try it again, surely?'
  }
};