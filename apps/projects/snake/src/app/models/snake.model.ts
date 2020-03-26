import { Direction } from '../app.constants';
import { Cell } from './cell.model';

export interface Snake {
  direction: Direction;
  body: Cell[];
  goldenHead: boolean;
}
