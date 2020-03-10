import { BaseModel } from './base.model';

export interface Office extends BaseModel {
  name: string;
  address: string;
}
