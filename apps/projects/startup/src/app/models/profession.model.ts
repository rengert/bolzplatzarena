import { BaseModel } from './base.model';

export enum ProfessionType {
  Acquisition,
  Management,
  Worker,
  Scrum,
}

export interface Profession extends BaseModel {
  type: ProfessionType;
  name: string;
  description: string;
  salaryFactor: number;
}
