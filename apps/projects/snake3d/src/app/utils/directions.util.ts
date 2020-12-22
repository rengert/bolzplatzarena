import { Direction } from '../app.constants';

export function getRelativeCoord(direction: Direction): { x: number; y: number; z: number; } {
  let x = 0;
  let y = 0;
  let z = 0;

  switch (direction) {
    case Direction.right:
      z = 1;
      break;
    case Direction.left:
      z = -1;
      break;
    case Direction.down:
      x = 1;
      break;
    case Direction.up:
      x = -1;
      break;
    case Direction.falling:
      y = -1;
      break;
    default:
      break;
  }

  return { x, y, z };
}

export function getDirection(current: Direction, newDirection: Direction): Direction {
  const directions = [Direction.left, Direction.up, Direction.right, Direction.down];
  let index = directions.indexOf(current);
  index -= (newDirection === Direction.left) ? 1 : 0;
  index += (newDirection === Direction.right) ? 1 : 0;
  if (index < 0) {
    index = directions.length - 1;
  }
  if (index === directions.length) {
    index = 0;
  }

  return directions[index];
}
