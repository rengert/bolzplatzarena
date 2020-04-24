export enum Level {
  Easy = 'Easy',
  Normal = 'Normal',
  Hard = 'Hard',
  Faster = 'Faster',
}

export enum Direction {
  Left = 'ArrowLeft',
  Up = 'ArrowUp',
  Right = 'ArrowRight',
  Down = 'ArrowDown',
  Falling = 'Falling',
}

export enum GameMode {
  Normal = 'Normal',
  NoWalls = 'NoWalls',
  GoldenApple = 'GoldenApple',
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
