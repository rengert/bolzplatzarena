import { Snake } from '../../../models/snake.model';

export function isTail(snake: Snake, coord: { x: number, y: number }): boolean {
  return snake.body.some(cell => (cell.x === coord.x) && (cell.y === coord.y));
}
