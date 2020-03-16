import { Level } from './level.model';
import { Person } from './person.model';
import { Profession } from './profession.model';

export interface Worker extends Person {
  salary: number;
  profession: Profession;
  level: Level;
  domicile: string;
  percentage: number;
}
