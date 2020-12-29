import { Mesh } from '@babylonjs/core';
import { Tower } from './tower.model';

export interface Field {
  free: boolean;
  mesh: Mesh;
  tower?: Tower;
}
