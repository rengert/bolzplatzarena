import { ElementRef, Injectable } from '@angular/core';
import { EngineService } from './engine.service';
import { ActionManager, Color3, ExecuteCodeAction, MeshBuilder, Scene, StandardMaterial } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import { Field } from '../models/field.model';
import { Coordinate } from '../models/coordinate.model';
import { EnemyService } from './enemy.service';
import { PathService } from './path.service';
import { TowerService } from './tower.service';

@Injectable({ providedIn: 'root' })
export class TowerDefenseService {
  private fields: Field[][];

  private material: StandardMaterial;
  private blockedMaterial: StandardMaterial;
  private hoverMaterial: StandardMaterial;

  private readonly start: Coordinate = { x: 0, y: 0 };
  private readonly end: Coordinate = { x: 19, y: 9 };
  private readonly size = { width: 10, height: 20 };

  constructor(
    private readonly engine: EngineService,
    private readonly enemy: EnemyService,
    private readonly path: PathService,
    private readonly tower: TowerService,
  ) {
  }

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    // scene
    const scene = this.initScene(canvas, this.size);

    // playground
    this.initPlayground(scene, this.size);

    // path finding
    this.path.init(this.fields);
    const path = this.path.find(this.start, this.end);
    this.highlightPath(path);

    // others
    this.enemy.init(this.fields);
    this.tower.init();
  }

  private initScene(canvas: ElementRef<HTMLCanvasElement>, size: { width: number, height: number }): Scene {
    const scene = this.engine.createScene(canvas.nativeElement, size);

    this.material = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.material.alpha = 1;
    this.material.diffuseColor = new Color3(0.123, 0.456, 0.789);

    this.hoverMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.hoverMaterial.alpha = 1;
    this.hoverMaterial.diffuseColor = new Color3(0.123, 1, 0.789);

    this.blockedMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.blockedMaterial.alpha = 1;
    this.blockedMaterial.diffuseColor = new Color3(0.823, 0.1, 0.789);

    scene.registerBeforeRender(() => {
      this.beforeRender();
    });
    scene.registerAfterRender(() => {
      this.afterRender();
    });

    this.engine.animate();

    return scene;
  }

  private initPlayground(scene: Scene, size: { width: number, height: number }): void {
    this.fields = [];
    for (let i = 0; i < size.width; i++) {
      this.fields[i] = [];
      for (let j = 0; j < size.height; j++) {
        const mesh = MeshBuilder.CreateBox(`field-${createUuid()}`, { size: 1 }, this.engine.scene);
        mesh.material = this.material;
        mesh.position.x = i - size.width / 2 + 0.5;
        mesh.position.z = j - size.height / 2 + 0.5;
        const field = { free: true, mesh };
        this.defineAction(field, scene);
        this.fields[i][j] = field;
      }
    }
  }

  private defineAction(field: Field, scene: Scene): void {
    field.mesh.actionManager = new ActionManager(scene);
    field.mesh.actionManager.registerAction(new ExecuteCodeAction(
      ActionManager.OnPickTrigger,
      () => {
        if (!field.free) {
          return;
        }
        field.free = !field.free;
        field.tower = this.tower.build(field);
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
    const path = this.path.find(this.start, this.end);
    this.highlightPath(path);

    if (this.enemy.items.length < 20 && Math.random() * 10 > 9.9) {
      this.enemy.appear(this.start, this.end);
    }

    this.enemy.update(path);
    this.tower.update();
  }

  private afterRender(): void {
  }
}
