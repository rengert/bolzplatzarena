import { Person } from './person.model';
import { Position } from './position.model';

export interface Worker extends Person {
  salary: number;
  position: Position;
}
