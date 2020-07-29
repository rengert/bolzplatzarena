import { Office } from './office.model';
import { Person } from './person.model';

export interface Startup {
  name: string;
  description: string;
  founder: Person;
  offices: Office[];
  credit: number;
}
