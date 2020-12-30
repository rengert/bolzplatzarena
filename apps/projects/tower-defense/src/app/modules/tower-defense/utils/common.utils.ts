import { Color3, Mesh, Vector3 } from '@babylonjs/core';

export function distanceTo(first: { mesh: Mesh }, second: { mesh: Mesh }) {
  return Vector3.Distance(first.mesh.position, second.mesh.position);
}

export function colorFrom(color: { red: number, green: number, blue: number }) {
  return new Color3(color.red, color.green, color.blue);
}
