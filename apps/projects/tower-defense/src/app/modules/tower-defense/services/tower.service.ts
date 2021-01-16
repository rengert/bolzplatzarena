import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';
import {
  ActionManager,
  Color3,
  Color4,
  ExecuteCodeAction,
  Mesh,
  ParticleHelper,
  ParticleSystem,
  SceneLoader,
  StandardMaterial,
  Texture,
  Vector3,
} from '@babylonjs/core';
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
      // shooting
      if (tower.enemy) {
        tower.enemy.energy -= (tower.power * tower.level);
        if (tower.enemy.energy <= 0) {
          this.enemy.kill(tower.enemy);

          // Create default particle systems
          var fireBlast = ParticleHelper.CreateDefault(tower.enemy.mesh.position, 100);

          // Emitter
          var fireBlastHemisphere = fireBlast.createHemisphericEmitter(.1, 0);

          // Set emission rate
          fireBlast.emitRate = 5000;

          // Start size
          fireBlast.minSize = 0.1;
          fireBlast.maxSize = 2;

          // Lifetime
          fireBlast.minLifeTime = 1;
          fireBlast.maxLifeTime = 2;

          // Emission power
          fireBlast.minEmitPower = 1;
          fireBlast.maxEmitPower = 2;

          // Limit velocity over time
          fireBlast.addLimitVelocityGradient(0, 40);
          fireBlast.addLimitVelocityGradient(0.120, 12.983);
          fireBlast.addLimitVelocityGradient(0.445, 1.780);
          fireBlast.addLimitVelocityGradient(0.691, 0.502);
          fireBlast.addLimitVelocityGradient(0.930, 0.05);
          fireBlast.addLimitVelocityGradient(1.0, 0);

          fireBlast.limitVelocityDamping = 0.9;

          // Start rotation
          fireBlast.minInitialRotation = -Math.PI / 2;
          fireBlast.maxInitialRotation = Math.PI / 2;

          // Texture
          fireBlast.particleTexture = new Texture('https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Explosion/ExplosionSim_Sample.png', this.engine.scene);
          fireBlast.blendMode = ParticleSystem.BLENDMODE_MULTIPLYADD;

          // Color over life
          fireBlast.addColorGradient(0.0, new Color4(1, 1, 1, 0));
          fireBlast.addColorGradient(0.1, new Color4(1, 1, 1, 1));
          fireBlast.addColorGradient(0.9, new Color4(1, 1, 1, 1));
          fireBlast.addColorGradient(1.0, new Color4(1, 1, 1, 0));

          // // Defines the color ramp to apply
          fireBlast.addRampGradient(0.0, new Color3(1, 1, 1));
          fireBlast.addRampGradient(0.09, new Color3(209 / 255, 204 / 255, 15 / 255));
          fireBlast.addRampGradient(0.18, new Color3(221 / 255, 120 / 255, 14 / 255));
          fireBlast.addRampGradient(0.28, new Color3(200 / 255, 43 / 255, 18 / 255));
          fireBlast.addRampGradient(0.47, new Color3(115 / 255, 22 / 255, 15 / 255));
          fireBlast.addRampGradient(0.88, new Color3(14 / 255, 14 / 255, 14 / 255));
          fireBlast.addRampGradient(1.0, new Color3(14 / 255, 14 / 255, 14 / 255));
          fireBlast.useRampGradients = true;

          // Defines the color remapper over time
          fireBlast.addColorRemapGradient(0, 0, 0.1);
          fireBlast.addColorRemapGradient(0.2, 0.1, 0.8);
          fireBlast.addColorRemapGradient(0.3, 0.2, 0.85);
          fireBlast.addColorRemapGradient(0.35, 0.4, 0.85);
          fireBlast.addColorRemapGradient(0.4, 0.5, 0.9);
          fireBlast.addColorRemapGradient(0.5, 0.95, 1.0);
          fireBlast.addColorRemapGradient(1.0, 0.95, 1.0);

          // Particle system start
          fireBlast.disposeOnStop = true;
          fireBlast.start(30);
          fireBlast.targetStopDuration = .4;

          // Animation update speed
          fireBlast.updateSpeed = 1 / 60;

          // Rendering order
          fireBlast.renderingGroupId = 1;
          tower.enemy = undefined;
        }
      }
    }
  }

  private openDialog(tower: Tower): void {
    this.dialog.open(TowerUpdateComponent, {
      data: tower,
    });
  }
}
