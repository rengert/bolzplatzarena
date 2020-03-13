import { Person } from './person.model';
import { Position } from './position.model';

export enum Level {
  junior = 0,
  normal = 1,
  senior = 2,
}

export interface Worker extends Person {
  salary: number;
  position: Position;
  level: Level;
  domicile: string;
  distance: number;
  percentage: number;
}
