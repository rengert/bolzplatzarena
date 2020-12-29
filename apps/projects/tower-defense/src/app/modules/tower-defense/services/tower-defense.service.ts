import { ElementRef, Injectable } from '@angular/core';
import { EngineService } from './engine.service';
import { ActionManager, Color3, ExecuteCodeAction, Mesh, Scene, StandardMaterial } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import { AStarFinder } from 'astar-typescript';

interface Coordinate {
  x: number;
  y: number;
}

interface Field {
  free: boolean;
  mesh: Mesh;
}

@Injectable({
  providedIn: 'root',
})
export class TowerDefenseService {
  fields: Field[][];

  material: StandardMaterial;
  blockedMaterial: StandardMaterial;
  hoverMaterial: StandardMaterial;

  readonly start: Coordinate = { x: 0, y: 0 };
  readonly end: Coordinate = { x: 19, y: 9 };

  path: Coordinate[];

  constructor(private readonly engine: EngineService) {
  }

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    const size = { width: 10, height: 20 };
    const scene = this.initScene(canvas, size);
    this.initPlayground(scene, size);
    const path = this.pathFinding();
    this.highlightPath(path);
  }

  private initScene(canvas: ElementRef<HTMLCanvasElement>, size: { width: number, height: number }): Scene {
    const scene = this.engine.createScene(canvas.nativeElement, size);

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
    this.material = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.material.alpha = 1;
    this.material.diffuseColor = new Color3(0.123, 0.456, 0.789);

    this.hoverMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.hoverMaterial.alpha = 1;
    this.hoverMaterial.diffuseColor = new Color3(0.123, 1, 0.789);

    this.blockedMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.blockedMaterial.alpha = 1;
    this.blockedMaterial.diffuseColor = new Color3(0.823, 0.1, 0.789);

    this.fields = [];
    for (let i = 0; i < size.width; i++) {
      this.fields[i] = [];
      for (let j = 0; j < size.height; j++) {
        const mesh = Mesh.CreateSphere(`field-${createUuid()}`, 16, 1, this.engine.scene);
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

  private pathFinding(): number[][] {
    const finder = new AStarFinder({
      diagonalAllowed: false,
      grid: {
        matrix: this.fields.map(arr => arr.map(item => item.free ? 0 : 1)),
      },
    });
    return finder.findPath(this.start, this.end);
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

  private beforeRender(): void {
    const path = this.pathFinding();
    this.highlightPath(path);
  }

  private afterRender(): void {
  }
}
