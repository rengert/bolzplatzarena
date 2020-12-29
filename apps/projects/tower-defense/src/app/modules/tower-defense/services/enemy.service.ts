import { Injectable } from '@angular/core';
import { Enemy } from '../models/enemy.model';
import { Color3, Mesh, StandardMaterial, Vector3 } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import { EngineService } from './engine.service';
import { Field } from '../models/field.model';
import { Coordinate } from '../models/coordinate.model';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root',
})
export class EnemyService {
  #items: Enemy[] = [];

  private material: StandardMaterial;
  private fields: Field[][];

  get items(): Enemy[] {
    return this.#items;
  }

  constructor(
    private readonly engine: EngineService,
    private readonly path: PathService,
  ) {
  }

  init(fields: Field[][]): void {
    this.material = new StandardMaterial('Enemy', this.engine.scene);
    this.material.alpha = 1;
    this.material.diffuseColor = new Color3(0.99, 0, 0);

    this.fields = fields;

    this.path.init(fields);
  }

  appear(source: Coordinate, target: Coordinate): void {
    const mesh = Mesh.CreateSphere(`enemy-${createUuid()}`, 32, 0.125, this.engine.scene);
    mesh.material = this.material;
    mesh.position.x = this.fields[source.x][source.y].mesh.position.x;
    mesh.position.z = this.fields[source.x][source.y].mesh.position.z;
    mesh.position.y = 1;
    this.items.push({ mesh, energy: 1, source, target });
  }

  update(path: number[][]): void {
    for (const enemy of this.items) {
      let enemyPath = path;
      let indexSource = enemyPath.findIndex(([y, x]: number[]) => x === enemy.source.x && y === enemy.source.y);
      if (indexSource === -1) {
        enemyPath = this.path.find({ x: enemy.source.y, y: enemy.source.x }, enemy.target);
        indexSource = enemyPath.findIndex(([y, x]: number[]) => x === enemy.source.x && y === enemy.source.y);
      }
      if (indexSource === enemyPath.length - 1) {
        continue;
      }
      const [y, x] = enemyPath[indexSource + 1] !;
      const targetCoordinates = { x, y };
      const target = this.fields[targetCoordinates.x][targetCoordinates.y];
      let deltaTargetSource = target.mesh.position.subtract(enemy.mesh.position);
      enemy.mesh.position.x += deltaTargetSource.x * 0.05;
      enemy.mesh.position.z += deltaTargetSource.z * 0.05;

      const enemyDelta = target.mesh.position.subtract(enemy.mesh.position);
      enemyDelta.y = 0;
      if (enemyDelta.equalsWithEpsilon(Vector3.Zero())) {
        enemy.source = targetCoordinates;
        enemy.mesh.position.x += Math.random() * 0.1;
        enemy.mesh.position.z += Math.random() * 0.1;
      }
    }
  }
}
