import { Injectable, NgZone } from '@angular/core';
import { Color4, Engine, FollowCamera, HemisphericLight, Light, Mesh, Scene, Vector3 } from '@babylonjs/core';
import { WindowService } from './window.service';

@Injectable({ providedIn: 'root' })
export class EngineService {
  scene: Scene;
  camera: FollowCamera;

  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private light: Light;

  constructor(
    private readonly ngZone: NgZone,
    private readonly windowRef: WindowService,
  ) {
  }

  createScene(canvas: HTMLCanvasElement, size: { width: number, height: number }): Scene {
    this.canvas = canvas;

    this.engine = new Engine(this.canvas, true);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.1, 0.1, 0.1, 1);

    const camera = new FollowCamera('camera1', new Vector3(0, 105, -5), this.scene);
    camera.setTarget(Vector3.Zero());
    camera.heightOffset = 15;

    this.camera = camera;
    this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);

    Mesh.CreateGround('ground1', size.width, size.height, 2, this.scene);

    return this.scene;
  }

  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      const rendererLoopCallback = () => {
        this.scene.render();
      };

      if (this.windowRef.document.readyState === 'loading') {
        this.windowRef.window.addEventListener('DOMContentLoaded', () => {
          this.engine.runRenderLoop(rendererLoopCallback);
        });
      } else {
        this.engine.runRenderLoop(rendererLoopCallback);
      }

      this.windowRef.window.addEventListener('resize', () => {
        this.engine.resize();
      });
    });
  }
}
