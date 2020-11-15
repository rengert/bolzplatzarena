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
  falling = 'Falling',
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

export class Points {
  static perMove = 1;
  static perApple = 50;
  static perGoldenApple = 75;
}
