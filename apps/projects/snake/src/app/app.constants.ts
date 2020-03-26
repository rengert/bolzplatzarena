export enum Level {
  Easy,
  Normal,
  Hard,
  Faster,
}

export enum Direction {
  Left = 'ArrowLeft',
  Up = 'ArrowUp',
  Right = 'ArrowRight',
  Down = 'ArrowDown',
}

export enum GameMode {
  Normal,
  NoWalls,
  GoldenApple,
}

export enum Speed {
  Slow = 700,
  Medium = 250,
  Fast = 100,
}

export class Points {
  static perMove = 1;
  static perApple = 50;
  static perGoldenApple = 75;
}
