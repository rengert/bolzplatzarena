import { ElementRef, Injectable, NgZone } from '@angular/core';
import { Color4, Engine, FreeCamera, HemisphericLight, Light, Mesh, Scene, Vector3 } from '@babylonjs/core';
import { WindowService } from './window.service';

@Injectable({ providedIn: 'root' })
export class EngineService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private camera: FreeCamera;
  public scene: Scene;
  private light: Light;
  private sphere: Mesh;

  constructor(private readonly ngZone: NgZone,
              private readonly windowRef: WindowService,
  ) {
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.canvas.style.height = '100%';
    this.canvas.style.width = '100%';
    this.engine = new Engine(this.canvas, true);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.1, 0.1, 0.1, 1);

    this.camera = new FreeCamera('camera1', new Vector3(0, 5, -10), this.scene);
    this.camera.setTarget(Vector3.Zero());
    this.camera.attachControl(this.canvas, true);

    this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);

    const ground = Mesh.CreateGround('ground1', 12, 12, 2, this.scene);
  }

  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      const rendererLoopCallback = () => {
        this.scene.render();
      };

      if (this.windowRef.document.readyState !== 'loading') {
        this.engine.runRenderLoop(rendererLoopCallback);
      } else {
        this.windowRef.window.addEventListener('DOMContentLoaded', () => {
          this.engine.runRenderLoop(rendererLoopCallback);
        });
      }

      this.windowRef.window.addEventListener('resize', () => {
        this.engine.resize();
      });
    });
  }
}
