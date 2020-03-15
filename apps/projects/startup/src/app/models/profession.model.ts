import { BaseModel } from './base.model';

export enum ProfessionType {
  Acquisition,
  Management,
  Worker,
  Scrum,
}

export interface Profession extends BaseModel {
  name: string;
  description: string;
  salaryFactor: number;
  type: ProfessionType;
}
