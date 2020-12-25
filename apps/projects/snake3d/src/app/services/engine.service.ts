import { Injectable, NgZone } from '@angular/core';
import {
  BackgroundMaterial,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  FollowCamera,
  Mesh,
  Scene,
  ShadowGenerator,
  SpotLight,
  Texture,
  Vector3,
  VirtualJoystick,
} from '@babylonjs/core';
import { SkyMaterial } from '@babylonjs/materials';
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
    this.scene.clearColor = new Color4(0.5, 0.8, 0.5, 1);
    this.scene.ambientColor = new Color3(0.3, 0.3, 0.3);

    const camera = new FollowCamera('camera1', new Vector3(5, 4, -47), this.scene);
    camera.setTarget(Vector3.Zero());
    camera.heightOffset = 12;

    this.camera = camera;
    const light = new DirectionalLight('hemi', new Vector3(-1, -3, 1), this.scene);
    light.position = new Vector3(3, 9, 3);
    light.diffuse = new Color3(1, 1, 1);
    light.specular = new Color3(1, 1, 1);

    const materialGround = new BackgroundMaterial('StandardMaterial', this.scene);
    const texture = new Texture('assets/textures/grass.jpg', this.scene);
    texture.uScale = 12;
    texture.vScale = 12;
    materialGround.alpha = 1;
    materialGround.diffuseTexture = texture;
    materialGround.shadowLevel = 0.125;

    const ground = Mesh.CreateGround('ground1', size.width, size.height, 2, this.scene);
    ground.material = materialGround;
    ground.receiveShadows = true;
    ground.position.y - 2.05;

    this.shadowGenerator = new ShadowGenerator(1024, light);
    this.shadowGenerator.useExponentialShadowMap = true;

    // Sky material
    const skyboxMaterial = new SkyMaterial('skyMaterial', this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.luminance = 0.1;
    skyboxMaterial.inclination = -0.5;
    skyboxMaterial.turbidity = 40;
    skyboxMaterial.cameraOffset.y = 12;

    // Sky mesh (box)
    var skybox = Mesh.CreateBox('skyBox', 50.0, this.scene);
    skybox.material = skyboxMaterial;

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
