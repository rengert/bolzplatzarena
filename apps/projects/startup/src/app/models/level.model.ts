import { BaseModel } from './base.model';

// eslint-disable-next-line no-shadow
export enum LevelType {
  junior = 0,
  normal = 1,
  senior = 2,
}

export interface Level extends BaseModel {
  type: LevelType;
  name: string;
  description: string;
  salaryFactor: number;
}
