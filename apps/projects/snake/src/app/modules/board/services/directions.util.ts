import { Direction } from '../../../app.constants';

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
