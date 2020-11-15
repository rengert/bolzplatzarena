import { BaseModel } from './base.model';

// eslint-disable-next-line no-shadow
export enum ProfessionType {
  acquisition,
  management,
  worker,
  scrum,
}

export interface Profession extends BaseModel {
  type: ProfessionType;
  name: string;
  description: string;
  salaryFactor: number;
}
