import { Direction } from '../app.constants';

export function getRelativeCoord(direction: Direction): { x: number, y: number, z: number } {
  let x = 0;
  let y = 0;
  let z = 0;

  switch (direction) {
    case Direction.Right:
      z = 1;
      break;
    case Direction.Left:
      z = -1;
      break;
    case Direction.Down:
      x = 1;
      break;
    case Direction.Up:
      x = -1;
      break;
    case Direction.Falling:
      y = -1;
      break;
    default:
      break;
  }

  return { x, y, z };
}

export function getDirection(current: Direction, newDirection: Direction): Direction {
  const directions = [Direction.Left, Direction.Up, Direction.Right, Direction.Down];
  let index = directions.indexOf(current);
  index -= (newDirection === Direction.Left) ? 1 : 0;
  index += (newDirection === Direction.Right) ? 1 : 0;
  if (index < 0) {
    index = directions.length - 1;
  }
  if (index === directions.length) {
    index = 0;
  }

  return directions[index];
}
