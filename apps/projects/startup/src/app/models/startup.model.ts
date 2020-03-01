import { Person } from './person.model';

export interface Startup {
  name: string;
  description: string;
  founder: Person;
}
