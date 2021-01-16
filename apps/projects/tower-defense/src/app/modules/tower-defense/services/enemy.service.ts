import { Injectable } from '@angular/core';
import { Enemy } from '../models/enemy.model';
import { Mesh, SceneLoader, StandardMaterial, Vector3 } from '@babylonjs/core';
import { EngineService } from './engine.service';
import { Field } from '../models/field.model';
import { Coordinate } from '../models/coordinate.model';
import { PathService } from './path.service';
import { VALUES } from '../constants';
import { colorFrom } from '../utils/common.utils';
import { AccountService } from './account.service';
import { ExplosionService } from './explosion.service';

const SPEED = 0.0125;

function getMove(move: number): number {
  return move >= 0
    ? Math.min(move, SPEED)
    : Math.max(move, -SPEED);
}

@Injectable({ providedIn: 'root' })
export class EnemyService {
  #items: Enemy[] = [];

  private material: StandardMaterial;
  private fields: Field[][];

  private enemyMeshTemplate: Mesh;

  get items(): Enemy[] {
    return this.#items;
  }

  constructor(
    private readonly account: AccountService,
    private readonly engine: EngineService,
    private readonly explosion: ExplosionService,
    private readonly path: PathService,
  ) {
  }

  async init(fields: Field[][]): Promise<void> {
    this.material = new StandardMaterial('Enemy', this.engine.scene);
    this.material.alpha = 1;
    this.material.diffuseColor = colorFrom(VALUES.colors.enemies.standard);

    this.fields = fields;

    const rootUrl = 'https://playground.babylonjs.com/scenes/Buggy/glTF-Draco/';
    this.enemyMeshTemplate = (await SceneLoader.ImportMeshAsync('', rootUrl, 'Buggy.gltf', this.engine.scene)).meshes[0] as Mesh;
    this.enemyMeshTemplate.scaling = new Vector3(0.005, 0.005, 0.005);
    this.enemyMeshTemplate.setEnabled(false);

    this.path.init(fields);
    this.explosion.init();
  }

  appear(source: Coordinate, target: Coordinate): void {
    if (!this.enemyMeshTemplate) {
      return;
    }
    const mesh = this.enemyMeshTemplate.instantiateHierarchy() as Mesh;
    mesh.setEnabled(true);
    mesh.position.x = this.fields[source.x][source.y].mesh.position.x;
    mesh.position.z = this.fields[source.x][source.y].mesh.position.z;
    mesh.position.y = 0.55;
    this.items.push({ mesh, energy: 1, source, target, dying: false, value: 100 });
  }

  hit(enemy: Enemy, power: number): void {
    enemy.energy -= power;
    this.explosion.do(enemy.mesh.position);
    if (enemy.energy <= 0) {
      this.kill(enemy);
    }
  }

  kill(enemy: Enemy): void {
    enemy.dying = true;
    this.#items = this.#items.filter(item => item !== enemy);
    this.account.addKill(enemy);

    this.explosion.do(enemy.mesh.position, true);

    enemy.mesh.dispose();
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
      const [y, x] = enemyPath[indexSource + 1];
      const targetCoordinates = { x, y };
      const target = this.fields[targetCoordinates.x][targetCoordinates.y];
      let deltaTargetSource = target.mesh.position.subtract(enemy.mesh.position);
      enemy.mesh.position.x += getMove(deltaTargetSource.x);
      enemy.mesh.position.z += getMove(deltaTargetSource.z);

      const enemyDelta = target.mesh.position.subtract(enemy.mesh.position);
      enemyDelta.y = 0;
      if (enemyDelta.equalsWithEpsilon(Vector3.Zero())) {
        enemy.source = targetCoordinates;
        enemy.mesh.position.x += Math.random() * SPEED;
        enemy.mesh.position.z += Math.random() * SPEED;
      }
    }
  }
}
