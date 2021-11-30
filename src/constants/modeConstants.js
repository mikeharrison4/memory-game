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

export const modeConfigConstants = {
  lives: {
    mode: LIVES,
    remaining: 2,
  },
  timer: {
    mode: TIMER,
    remaining: 60, // seconds
  }
};

// export const modeStrings = {
//
// }