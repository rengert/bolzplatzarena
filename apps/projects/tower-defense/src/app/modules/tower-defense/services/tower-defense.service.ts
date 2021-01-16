import { ElementRef, Injectable } from '@angular/core';
import { EngineService } from './engine.service';
import { ActionManager, ExecuteCodeAction, MeshBuilder, Scene, StandardMaterial, Texture } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import { Field } from '../models/field.model';
import { Coordinate } from '../models/coordinate.model';
import { EnemyService } from './enemy.service';
import { PathService } from './path.service';
import { TowerService } from './tower.service';
import { colorFrom } from '../utils/common.utils';
import { VALUES } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountService } from './account.service';

export interface Loading {
  steps: number,
  started: number,
  finished: number,
}

@Injectable({ providedIn: 'root' })
export class TowerDefenseService {
  readonly loading$: Observable<Loading>;

  private fields: Field[][];

  private material: StandardMaterial;
  private blockedMaterial: StandardMaterial;
  private hoverMaterial: StandardMaterial;

  private readonly start: Coordinate = { x: 0, y: 0 };
  private readonly end: Coordinate = { x: 19, y: 9 };
  private readonly size = { width: 10, depth: 20 };

  private bestPath: number[][] = [];

  private readonly loading = new BehaviorSubject<Loading>({ steps: 0, started: 0, finished: 0 });

  private started = false;
  private defeated = false;

  constructor(
    private readonly account: AccountService,
    private readonly engine: EngineService,
    private readonly enemy: EnemyService,
    private readonly path: PathService,
    private readonly tower: TowerService,
  ) {
    this.loading$ = this.loading;
  }

  async init(canvas: ElementRef<HTMLCanvasElement>): Promise<void> {
    const steps = 8;
    let started = 0;
    let finished = 0;

    // scene
    this.loading.next({ steps, started: started++, finished: ++finished });
    const scene = this.initScene(canvas);

    // playground
    this.loading.next({ steps, started: started++, finished: ++finished });
    this.initPlayground(scene, this.size);

    // others
    this.loading.next({ steps, started: started++, finished: ++finished });
    await this.enemy.init(this.fields);
    this.loading.next({ steps, started: started++, finished: ++finished });
    await this.tower.init();

    // path finding
    this.loading.next({ steps, started: started++, finished: ++finished });
    this.path.init(this.fields);
    this.loading.next({ steps, started: started++, finished: ++finished });
    this.bestPath = this.path.find(this.start, this.end);
    this.loading.next({ steps, started: started++, finished: ++finished });
    this.highlightPath(this.bestPath);

    this.loading.next({ steps, started: started++, finished: ++finished });
    this.engine.fitToView();
    this.loading.next({ steps, started: steps, finished: steps });

    // todo: move to an dialog
    this.started = true;
  }

  private initScene(canvas: ElementRef<HTMLCanvasElement>): Scene {
    const scene = this.engine.createScene(canvas.nativeElement);

    this.material = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.material.alpha = 1;
    this.material.ambientTexture = new Texture('assets/textures/grass.dds.jpg', scene);
    this.material.diffuseColor = colorFrom(VALUES.colors.fields.standard);

    this.hoverMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.hoverMaterial.alpha = 1;
    this.hoverMaterial.ambientTexture = new Texture('assets/textures/grass.dds.jpg', scene);
    this.hoverMaterial.diffuseColor = colorFrom(VALUES.colors.fields.hover);

    this.blockedMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.blockedMaterial.alpha = 1;
    this.blockedMaterial.ambientTexture = new Texture('assets/textures/floor.png', scene);
    this.blockedMaterial.diffuseColor = colorFrom(VALUES.colors.fields.blocked);

    scene.registerBeforeRender(() => {
      this.beforeRender();
    });
    scene.registerAfterRender(() => {
      this.afterRender();
    });

    this.engine.animate();

    return scene;
  }

  private initPlayground(scene: Scene, size: { width: number, depth: number }): void {
    this.fields = [];
    for (let i = 0; i < size.width; i++) {
      this.fields[i] = [];
      for (let j = 0; j < size.depth; j++) {
        const mesh = MeshBuilder.CreateBox(`field-${createUuid()}`, { size: 1 }, this.engine.scene);
        mesh.material = this.material;
        mesh.position.x = i - size.width / 2 + VALUES.config.fields.size / 2;
        mesh.position.z = j - size.depth / 2 + VALUES.config.fields.size / 2;
        const field = { free: true, mesh };
        this.defineAction(field, scene);
        this.fields[i][j] = field;
      }
    }
    const mesh = MeshBuilder.CreateBox(`field-${createUuid()}`, { height: 1, width: size.width, depth: size.depth }, this.engine.scene);
    mesh.material = this.material;
    mesh.position.x = 0;
    mesh.position.z = 0;
    mesh.visibility = 0.35;
    mesh.position.y = -1;
    this.engine.mesh = mesh;
    this.engine.fitToView();
  }

  private defineAction(field: Field, scene: Scene): void {
    field.mesh.actionManager = new ActionManager(scene);
    field.mesh.actionManager.registerAction(new ExecuteCodeAction(
      ActionManager.OnPickTrigger,
      () => {
        if (!field.free) {
          return;
        }
        field.tower = this.tower.build(field);
        field.free = !field.tower;
        if (field.free) {
          return;
        }
        const path = this.path.find(this.start, this.end);
        if (path.length) {
          this.bestPath = path;
          this.highlightPath(this.bestPath);
          return;
        }

        field.free = true;
        this.tower.destroy(field);
      },
    ));
  }

  private highlightPath(path: number[][]): void {
    // reset
    for (let i = 0; i < this.fields.length; i++) {
      const meshes = this.fields[i];
      for (let j = 0; j < meshes.length; j++) {
        meshes[j].mesh.material = meshes[j].free ? this.material : this.blockedMaterial;
      }
    }
    // highlight the path
    for (const [y, x] of path) {
      this.fields[x][y].mesh.material = this.hoverMaterial;
    }
  }

  /** rendering stuff **/

  private beforeRender(): void {
    if (!this.started || this.defeated) {
      return;
    }

    if ((this.enemy.items.length < VALUES.config.enemies.count)
      && (Math.random() > VALUES.config.enemies.probability)) {
      this.enemy.appear(this.start, this.end);
    }

    this.enemy.update(this.bestPath);

    if (this.account.defeated) {
      this.defeated = true;
      return;
    }
    this.tower.update();
  }

  private afterRender(): void {
  }
}
