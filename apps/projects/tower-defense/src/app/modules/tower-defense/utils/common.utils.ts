import { Mesh, Vector3 } from '@babylonjs/core';

export function distanceTo(first: { mesh: Mesh }, second: { mesh: Mesh }) {
  return Vector3.Distance(first.mesh.position, second.mesh.position);
}
