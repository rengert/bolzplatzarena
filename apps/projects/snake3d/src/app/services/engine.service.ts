import { Injectable, NgZone } from '@angular/core';
import {
  Color3,
  Color4,
  Engine,
  FollowCamera,
  HemisphericLight,
  Mesh,
  Scene,
  ShadowGenerator,
  SpotLight,
  StandardMaterial,
  Vector3,
  VirtualJoystick,
} from '@babylonjs/core';
import { WindowService } from './window.service';

@Injectable({ providedIn: 'root' })
export class EngineService {
  scene: Scene;
  camera: FollowCamera;
  shadowGenerator: ShadowGenerator;
  spotLight: SpotLight;

  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private virtualJoystick: VirtualJoystick;

  constructor(
    private readonly ngZone: NgZone,
    private readonly windowRef: WindowService,
  ) {
  }

  get joystick(): VirtualJoystick {
    return this.virtualJoystick;
  }

  createScene(canvas: HTMLCanvasElement, size: { width: number; height: number; }): Scene {
    this.canvas = canvas;

    this.engine = new Engine(this.canvas, true);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.1, 0.1, 0.1, 1);

    const camera = new FollowCamera('camera1', new Vector3(0, 105, -5), this.scene);
    camera.setTarget(Vector3.Zero());
    camera.heightOffset = 15;

    this.camera = camera;
    const light = new HemisphericLight('dir01', new Vector3(0, 10, 0), this.scene);

    this.spotLight = new SpotLight('spot02',
      new Vector3(0, 8, 0),
      new Vector3(0, -1, 0), 1.1, 16, this.scene);
    this.spotLight.intensity = 0.99;

    const materialGround = new StandardMaterial('StandardMaterial', this.scene);
    materialGround.alpha = 1;
    materialGround.diffuseColor = new Color3(0.4392, 0.2824, 0.2353);

    const ground = Mesh.CreateGround('ground1', size.width, size.height, 2, this.scene);
    ground.material = materialGround;
    ground.receiveShadows = true;

    this.shadowGenerator = new ShadowGenerator(1024, this.spotLight);
    this.shadowGenerator.useExponentialShadowMap = true;

    this.virtualJoystick = new VirtualJoystick(false);
    this.virtualJoystick.alwaysVisible = true;

    return this.scene;
  }

  clean(): void {
    this.scene?.dispose();
    this.engine?.dispose();
    this.camera?.dispose();
    this.spotLight?.dispose();
    this.shadowGenerator?.dispose();
    this.virtualJoystick.releaseCanvas();
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
