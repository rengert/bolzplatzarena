import { Mesh } from '@babylonjs/core';
import { Coordinate } from './coordinate.model';

export interface Enemy {
  energy: number;
  mesh: Mesh;
  target?: Coordinate;
  source: Coordinate;
}
