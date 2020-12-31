import { Mesh } from '@babylonjs/core';
import { Enemy } from './enemy.model';

export interface Tower {
  power: number;
  enemy?: Enemy;
  mesh: Mesh;
  range: number;
}
