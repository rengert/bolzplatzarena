import { BaseModel } from './base.model';

export interface Person extends BaseModel {
  firstname: string;
  lastname: string;
}
