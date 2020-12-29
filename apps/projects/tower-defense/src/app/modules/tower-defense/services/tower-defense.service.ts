import { ElementRef, Injectable } from '@angular/core';
import { EngineService } from './engine.service';
import { ActionManager, Color3, ExecuteCodeAction, Mesh, Scene, StandardMaterial } from '@babylonjs/core';
import { createUuid } from '@bpa/core';

@Injectable({
  providedIn: 'root',
})
export class TowerDefenseService {
  meshes: Mesh[][];

  material: StandardMaterial;
  hoverMaterial: StandardMaterial;

  constructor(private readonly engine: EngineService) {
  }

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    const size = { width: 10, height: 20 };
    const scene = this.initScene(canvas, size);
    this.initPlayground(scene, size);
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

    this.meshes = [];
    for (let i = 0; i < size.width; i++) {
      this.meshes[i] = [];
      for (let j = 0; j < size.height; j++) {
        const mesh = Mesh.CreateSphere(`field-${createUuid()}`, 16, 1, this.engine.scene);
        mesh.material = this.material;
        mesh.position.x = i - size.width / 2 + 0.5;
        mesh.position.z = j - size.height / 2 + 0.5;
        this.defineAction(mesh, scene, j, i);
        this.meshes[i][j] = mesh;
      }
    }
  }

  private defineAction(instance: Mesh, scene: Scene, j: number, i: number): void {
    instance.actionManager = new ActionManager(scene);
    instance.actionManager.registerAction(new ExecuteCodeAction(
      ActionManager.OnPickTrigger,
      () => {
        instance.material = instance.material === this.material
          ? this.hoverMaterial
          : this.material;
      },
    ));
  }

  private beforeRender(): void {
  }

  private afterRender(): void {
  }
}
