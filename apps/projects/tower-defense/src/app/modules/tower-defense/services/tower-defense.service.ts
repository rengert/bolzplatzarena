import { ElementRef, Injectable } from '@angular/core';
import { EngineService } from './engine.service';
import { ActionManager, Color3, ExecuteCodeAction, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import { AStarFinder } from 'astar-typescript';
import { Field } from '../models/field.model';
import { Coordinate } from '../models/coordinate.model';
import { Enemy } from '../models/enemy.model';

@Injectable({ providedIn: 'root' })
export class TowerDefenseService {
  private fields: Field[][];

  private enemyMaterial: StandardMaterial;
  private material: StandardMaterial;
  private blockedMaterial: StandardMaterial;
  private hoverMaterial: StandardMaterial;

  private readonly start: Coordinate = { x: 0, y: 0 };
  private readonly end: Coordinate = { x: 19, y: 9 };
  private readonly size = { width: 10, height: 20 };

  private path: Coordinate[];

  private enemies: Enemy[] = [];

  constructor(private readonly engine: EngineService) {
  }

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    const scene = this.initScene(canvas, this.size);
    this.initPlayground(scene, this.size);
    const path = this.pathFinding();
    this.highlightPath(path);
    console.log(path);
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

    this.enemyMaterial = new StandardMaterial('Enemy', this.engine.scene);
    this.enemyMaterial.alpha = 1;
    this.enemyMaterial.diffuseColor = new Color3(0.99, 0, 0);

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
        field.free = !field.free;
      },
    ));
  }

  private pathFinding(start = this.start): number[][] {
    const finder = new AStarFinder({
      diagonalAllowed: false,
      grid: {
        matrix: this.fields.map(arr => arr.map(item => item.free ? 0 : 1)),
      },
    });
    return finder.findPath(start, this.end);
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

  private updateEnemies(path: number[][]): void {
    for (const enemy of this.enemies) {
      let enemyPath = path;
      let indexSource = enemyPath.findIndex(([y, x]: number[]) => x === enemy.source.x && y === enemy.source.y);
      if (indexSource === -1) {
        enemyPath = this.pathFinding({ x: enemy.source.y, y: enemy.source.x });
        indexSource = enemyPath.findIndex(([y, x]: number[]) => x === enemy.source.x && y === enemy.source.y);
      }
      if (indexSource === enemyPath.length - 1) {
        continue;
      }
      const [y, x] = enemyPath[indexSource + 1] !;
      enemy.target = { x, y };
      const target = this.fields[enemy.target.x][enemy.target.y];
      let deltaTargetSource = target.mesh.position.subtract(enemy.mesh.position);
      enemy.mesh.position.x += deltaTargetSource.x * 0.05;
      enemy.mesh.position.z += deltaTargetSource.z * 0.05;

      const enemyDelta = target.mesh.position.subtract(enemy.mesh.position);
      enemyDelta.y = 0;
      if (enemyDelta.equalsWithEpsilon(Vector3.Zero())) {
        enemy.source = enemy.target;
        enemy.target = undefined;
        enemy.mesh.position.x += Math.random() * 0.1;
        enemy.mesh.position.z += Math.random() * 0.1;
      }
    }
  }

  /** rendering stuff **/

  private beforeRender(): void {
    const path = this.pathFinding();
    this.highlightPath(path);

    if (this.enemies.length < 20 && Math.random() * 10 > 9.9) {
      const mesh = Mesh.CreateSphere(`enemy-${createUuid()}`, 32, 0.125, this.engine.scene);
      mesh.material = this.enemyMaterial;
      mesh.position.x = -this.size.width / 2 + 0.5;
      mesh.position.z = -this.size.height / 2 + 0.5;
      mesh.position.y = 1;
      this.enemies.push({ mesh, energy: 1, source: this.start });
    }

    this.updateEnemies(path);
  }

  private afterRender(): void {
  }
}
