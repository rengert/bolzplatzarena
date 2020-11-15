// eslint-disable-next-line no-shadow
export enum Level {
  easy = 'Easy',
  normal = 'Normal',
  hard = 'Hard',
  faster = 'Faster',
}

// eslint-disable-next-line no-shadow
export enum Direction {
  left = 'ArrowLeft',
  up = 'ArrowUp',
  right = 'ArrowRight',
  down = 'ArrowDown',
}

// eslint-disable-next-line no-shadow
export enum GameMode {
  normal = 'Normal',
  noWalls = 'NoWalls',
  goldenApple = 'GoldenApple',
}

// eslint-disable-next-line no-shadow
export enum Speed {
  slow = 700,
  medium = 250,
  fast = 100,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Points = {
  perMove: 1,
  perApple: 50,
  perGoldenApple: 75,
};
