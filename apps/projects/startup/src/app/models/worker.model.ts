import { Person } from './person.model';
import { Profession } from './profession.model';

export enum Level {
  junior = 0,
  normal = 1,
  senior = 2,
}

export interface Worker extends Person {
  salary: number;
  profession: Profession;
  level: Level;
  domicile: string;
  distance: number;
  percentage: number;
}
