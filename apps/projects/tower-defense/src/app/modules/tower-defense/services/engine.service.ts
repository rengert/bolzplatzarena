import { Injectable, NgZone } from '@angular/core';
import {
  ActionManager,
  ArcRotateCamera,
  BackgroundMaterial,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  Mesh,
  Scene,
  ShadowGenerator,
  SpotLight,
  Texture,
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

  createScene(canvas: HTMLCanvasElement, size: { width: number; height: number; }): Scene {
    this.canvas = canvas;

    this.engine = new Engine(this.canvas, true);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.5, 0.8, 0.5, 1);
    this.scene.ambientColor = new Color3(0.3, 0.3, 0.3);

    this.initLight();
    this.initGround(size);
    this.initSky();
    this.initCamera();

    this.scene.actionManager = new ActionManager(this.scene);

    return this.scene;
  }

  private initCamera(): void {
    const camera = new ArcRotateCamera('camera1', 0, 0, 20, new Vector3(0, 0, 0), this.scene);
    camera.setTarget(Vector3.Zero());
  }

  private initGround({ width, height }: { width: number; height: number; }): void {
    const materialGround = new BackgroundMaterial('StandardMaterial', this.scene);
    // todo: find textture
    const texture = new Texture('assets/textures/grass.jpg', this.scene);
    texture.uScale = 12;
    texture.vScale = 12;
    materialGround.alpha = 1;
    materialGround.diffuseTexture = texture;
    materialGround.shadowLevel = 0.125;

    const ground = Mesh.CreateGround('ground1', width, height, 2, this.scene);
    ground.material = materialGround;
    ground.receiveShadows = true;
    ground.position.y - 2.05;
  }

  private initLight(): void {
    const light = new DirectionalLight('hemi', new Vector3(-1, -3, 1), this.scene);
    light.position = new Vector3(3, 9, 3);
    light.diffuse = new Color3(1, 1, 1);
    light.specular = new Color3(1, 1, 1);

    this.shadowGenerator = new ShadowGenerator(1024, light);
    this.shadowGenerator.useExponentialShadowMap = true;
  }

  private initSky(): void {
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
  }

  private clean(): void {
    this.scene?.dispose();
    this.engine?.dispose();
    // this.camera?.dispose();
    this.spotLight?.dispose();
    this.shadowGenerator?.dispose();
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
