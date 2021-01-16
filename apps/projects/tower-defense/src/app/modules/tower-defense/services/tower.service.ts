import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';
import { ActionManager, ExecuteCodeAction, Mesh, SceneLoader, StandardMaterial, Vector3 } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import { EngineService } from './engine.service';
import { Tower } from '../models/tower.model';
import { EnemyService } from './enemy.service';
import { first, orderBy } from 'lodash';
import { colorFrom, distanceTo } from '../utils/common.utils';
import { VALUES } from '../constants';
import { AccountService } from './account.service';
import { TowerUpdateComponent } from '../components/tower-defense/dialogs/tower-update/tower-update.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class TowerService {
  private material: StandardMaterial;
  private towers: Tower[] = [];

  private smallGunMeshTemplate: Mesh;

  constructor(
    private readonly account: AccountService,
    private readonly engine: EngineService,
    private readonly enemy: EnemyService,
    private readonly dialog: MatDialog,
  ) {
  }

  async init(): Promise<void> {
    this.material = new StandardMaterial('Tower', this.engine.scene);
    this.material.alpha = 1;
    this.material.diffuseColor = colorFrom(VALUES.colors.towers.standard);

    this.towers = [];
    const rootUrl = './assets/models/';
    const loadResult = await SceneLoader.ImportMeshAsync('', rootUrl, 'gun1.obj', this.engine.scene);
    this.smallGunMeshTemplate = Mesh.MergeMeshes(loadResult.meshes.map(mesh => mesh as Mesh)) as Mesh;
    this.smallGunMeshTemplate.scaling = new Vector3(0.25, 0.25, 0.25);
    this.smallGunMeshTemplate.setEnabled(false);
  }

  build(field: Field): Tower | undefined {
    if (!this.account.pay(VALUES.config.tower.price)) {
      return undefined;
    }

    const mesh = this.smallGunMeshTemplate.createInstance(`tower-${createUuid()}`);
    if (!mesh) {
      return undefined;
    }
    mesh.position.x = field.mesh.position.x;
    mesh.position.z = field.mesh.position.z;
    mesh.position.y = 0.5;
    const tower: Tower = {
      power: VALUES.config.tower.power,
      mesh,
      range: VALUES.config.tower.range,
      shotsPerSecond: VALUES.config.tower.shotsPerSecond,
      price: VALUES.config.tower.price,
      level: 1,
    };

    mesh.actionManager = new ActionManager(this.engine.scene);
    mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger,
      () => {
        this.openDialog(tower);
      },
    ));
    this.engine.shadowGenerator.addShadowCaster(mesh);

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
      // is the enemy still there?
      if (tower.enemy) {
        // todo: check if it could be harder, if tower shots nevertheless, but get no money for the kill
        if (tower.enemy.dying || distanceTo(tower, tower.enemy) > tower.range) {
          tower.enemy = undefined;
        }
      }
      // find the enemy
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
      this.shoot(tower);
    }
  }

  private shoot(tower: Tower): void {
    const { enemy } = tower;
    if (!enemy) {
      return;
    }
    this.enemy.hit(enemy, (tower.power * tower.level));
    if (enemy.dying) {
      tower.enemy = undefined;
    }
  }

  private openDialog(tower: Tower): void {
    this.dialog.open(TowerUpdateComponent, {
      data: tower,
    });
  }
}
