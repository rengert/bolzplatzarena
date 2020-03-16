import { BaseModel } from './base.model';
import { City } from './city.model';

export interface Office extends BaseModel {
  name: string;
  address: string;
  city: City;
}
