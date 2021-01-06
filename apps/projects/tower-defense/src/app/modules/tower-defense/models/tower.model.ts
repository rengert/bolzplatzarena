import { Enemy } from './enemy.model';
import { AbstractMesh } from '@babylonjs/core';

export interface Tower {
  power: number;
  enemy?: Enemy;
  mesh: AbstractMesh;
  range: number;
  shotsPerSecond: number;
  lastShot?: Date;
  price: number;
  level: 1 | 2 | 3;
}
