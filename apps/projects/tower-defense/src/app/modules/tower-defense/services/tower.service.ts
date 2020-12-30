import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';
import { Color3, Mesh, StandardMaterial } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import { EngineService } from './engine.service';
import { Tower } from '../models/tower.model';
import { EnemyService } from './enemy.service';
import { first, orderBy } from 'lodash';
import { distanceTo } from '../utils/common.utils';

@Injectable({ providedIn: 'root' })
export class TowerService {
  private material: StandardMaterial;
  private towers: Tower[] = [];

  constructor(
    private readonly engine: EngineService,
    private readonly enemy: EnemyService,
  ) {
  }

  init(): void {
    this.material = new StandardMaterial('Tower', this.engine.scene);
    this.material.alpha = 1;
    this.material.diffuseColor = new Color3(0, 0.99, 0);

    this.towers = [];
  }

  build(field: Field): Tower {
    const mesh = Mesh.CreateSphere(`tower-${createUuid()}`, 32, 0.125, this.engine.scene);
    mesh.material = this.material;
    mesh.position.x = field.mesh.position.x;
    mesh.position.z = field.mesh.position.z;
    mesh.position.y = 1;
    const tower = { power: 1, mesh };
    this.towers.push(tower);

    return tower;
  }

  update(): void {
    if (!this.enemy.items.length) {
      return;
    }

    for (const tower of this.towers) {
      if (tower.enemy) {
        if (distanceTo(tower, tower.enemy) > 1) {
          tower.enemy = undefined;
        }
      }
      if (!tower.enemy) {
        // find in range
        const candidate = first(orderBy(
          this.enemy.items.map(enemy => ({ enemy, distance: distanceTo(tower, enemy) })),
          item => item.distance,
          ['asc'],
        ));
        if (candidate && Math.abs(candidate.distance) < 1) {
          tower.enemy = candidate.enemy;
        }
      }

      // shooting
      if (tower.enemy) {
        tower.enemy.energy -= tower.power;

        if (tower.enemy.energy < 0) {
          this.enemy.kill(tower.enemy);
          tower.enemy = undefined;
        }
      }
    }
  }
}
