import { BaseModel } from './base.model';

export enum LevelType {
  Junior = 0,
  Normal = 1,
  Senior = 2,
}

export interface Level extends BaseModel {
  type: LevelType;
  name: string;
  description: string;
  salaryFactor: number;
}
