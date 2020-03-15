import { BaseModel } from './base.model';

export interface City extends BaseModel {
  name: string;
  costFactor: number;
  location: {
    latitude: number;
    longitude: number;
  };
}
