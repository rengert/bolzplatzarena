import { Injectable, NgZone } from '@angular/core';
import {
  ActionManager,
  ArcRotateCamera,
  Color3,
  DirectionalLight,
  Engine,
  Mesh,
  Scene,
  ShadowGenerator,
  SpotLight,
  Vector3,
} from '@babylonjs/core';
import { SkyMaterial } from '@babylonjs/materials';
import { WindowService } from '@bpa/core';

@Injectable({ providedIn: 'root' })
export class EngineService {
  scene: Scene;
  shadowGenerator: ShadowGenerator;
  spotLight: SpotLight;

  private canvas: HTMLCanvasElement;
  private engine: Engine;

  constructor(
    private readonly ngZone: NgZone,
    private readonly windowRef: WindowService,
  ) {
  }

  createScene(canvas: HTMLCanvasElement): Scene {
    this.canvas = canvas;

    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);

    this.initLight();
    this.initSky();
    this.initCamera();

    this.scene.actionManager = new ActionManager(this.scene);

    return this.scene;
  }

  private initCamera(): void {
    const camera = new ArcRotateCamera('camera1', 0, .44, 15, new Vector3(0, 0, 0), this.scene);
    camera.setTarget(Vector3.Zero());
  }

  private initLight(): void {
    const light = new DirectionalLight('direct', new Vector3(-2, -3, -2), this.scene);
    light.diffuse = new Color3(1, 1, 1);
    light.specular = new Color3(1, 1, 1);

    const lightLeft = new DirectionalLight('directLeft', new Vector3(12, -14, 14), this.scene);
    lightLeft.diffuse = new Color3(1, 1, 1);
    lightLeft.specular = new Color3(1, 1, 1);

    this.shadowGenerator = new ShadowGenerator(1024, light);
    this.shadowGenerator.useExponentialShadowMap = true;
  }

  private initSky(): void {
    // Sky material
    const skyboxMaterial = new SkyMaterial('skyMaterial', this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.luminance = 0.9;
    skyboxMaterial.inclination = -0.1;
    skyboxMaterial.turbidity = 10;
    skyboxMaterial.cameraOffset.y = 12;

    // Sky mesh (box)
    var skybox = Mesh.CreateBox('skyBox', 50.0, this.scene);
    skybox.material = skyboxMaterial;
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
