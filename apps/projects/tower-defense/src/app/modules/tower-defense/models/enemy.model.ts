import { AbstractMesh } from '@babylonjs/core';
import { Coordinate } from './coordinate.model';

export interface Enemy {
  energy: number;
  mesh: AbstractMesh;
  target: Coordinate;
  source: Coordinate;
  dying: boolean;
  value: number;
}
