import { ElementRef, Injectable } from '@angular/core';
import { EngineService } from './engine.service';
import { Color3, InstancedMesh, Mesh, Scene, StandardMaterial } from '@babylonjs/core';
import { createUuid } from '@bpa/core';

@Injectable({
  providedIn: 'root',
})
export class TowerDefenseService {
  meshes: InstancedMesh[][];

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
    const material = new StandardMaterial('StandardMaterial', this.engine.scene);
    material.alpha = 1;
    material.diffuseColor = new Color3(102, 113, 214);

    const template = Mesh.CreateSphere('template', 16, 1, this.engine.scene);
    template.material = material;
    template.setEnabled(false);
    this.meshes = [];
    for (let i = 0; i < size.width; i++) {
      this.meshes[i] = [];
      for (let j = 0; j < size.height; j++) {
        const mesh = template.createInstance(`field-${createUuid()}`);
        mesh.position.x = i - size.width / 2 + 0.5;
        mesh.position.z = j - size.height / 2 + 0.5;
        this.meshes[i][j] = mesh;
      }
    }
  }

  private beforeRender(): void {
  }

  private afterRender(): void {
  }
}
