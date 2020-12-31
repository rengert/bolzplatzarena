import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';
import { Mesh, StandardMaterial } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import { EngineService } from './engine.service';
import { Tower } from '../models/tower.model';
import { EnemyService } from './enemy.service';
import { first, orderBy } from 'lodash';
import { colorFrom, distanceTo } from '../utils/common.utils';
import { VALUES } from '../constants';

const SEGMENTS = 32;

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
    this.material.diffuseColor = colorFrom(VALUES.colors.towers.standard);

    this.towers = [];
  }

  build(field: Field): Tower {
    const mesh = Mesh.CreateSphere(`tower-${createUuid()}`, SEGMENTS, VALUES.config.tower.size, this.engine.scene);
    mesh.material = this.material;
    mesh.position.x = field.mesh.position.x;
    mesh.position.z = field.mesh.position.z;
    mesh.position.y = 1;
    const tower = {
      power: VALUES.config.tower.power,
      mesh,
      range: VALUES.config.tower.range,
      shotsPerSecond: VALUES.config.tower.shotsPerSecond,
    };
    this.towers.push(tower);

    return tower;
  }

  destroy(field: Field): void {
    this.towers = this.towers.filter(item => item !== field.tower);
    field.tower?.mesh.dispose();
    field.tower = undefined;
  }

  update(): void {
    if (!this.enemy.items.length) {
      return;
    }

    const date = new Date();
    const value = date.valueOf();
    const towers = this.towers.filter(({ shotsPerSecond, lastShot }) => {
      return !lastShot || (value - lastShot.valueOf()) > (1000 / shotsPerSecond);
    });
    for (const tower of towers) {
      tower.lastShot = date;
      if (tower.enemy) {
        if (distanceTo(tower, tower.enemy) > tower.range) {
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
        if (candidate && Math.abs(candidate.distance) <= tower.range) {
          tower.enemy = candidate.enemy;
        }
      }

      // shooting
      if (tower.enemy) {
        tower.enemy.energy -= tower.power;
        console.log(tower.enemy.mesh.name, tower.enemy.energy);
        if (tower.enemy.energy <= 0) {
          this.enemy.kill(tower.enemy);
          tower.enemy = undefined;
        }
      }
    }
  }
}
