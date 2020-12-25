import { Injectable } from '@angular/core';
import { Color3, InstancedMesh, Mesh, StandardMaterial, Texture, Vector3 } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import { EngineService } from './engine.service';

const SEGMENTS = 32;
const DISTANCE_TAIL = 0.35;
const TAIL_FOLLOW_SPEED = 2.125;
const FALLING_SPEED = 0.125;
const HEAD_COLOR = new Color3(0.816, 0.457, 0.097);
const BODY_COLOR = new Color3(0.40, 0.40, 0);
const BODY_SIZE = 0.5;

export enum Speed {
  Slow = 0.01,
  Normal = 0.02,
  Fast = 0.05,
  Faster = 0.075,
}

interface Body {
  mesh: InstancedMesh | Mesh;
  targets: Vector3[];
  name: string;
}

interface Snake {
  body: Body[];
  speed: Speed;
}

@Injectable({ providedIn: 'root' })
export class SnakeService {
  private snake: Snake;

  private standardMaterial: StandardMaterial;
  private normalSphereTemplate: Mesh;

  constructor(private readonly engine: EngineService) {
  }

  get bodySize(): number {
    return BODY_SIZE;
  }

  get head(): InstancedMesh | Mesh {
    return this.snake.body[0].mesh;
  }

  get intersectsTail(): boolean {
    const crash = this.snake.body.find((item, index) => index > 2
      && this.head.intersectsMesh(item.mesh, true),
    );
    return !!crash;
  }

  get length(): number {
    return this.snake.body.length;
  }

  get position(): Vector3 {
    return this.head.position;
  }

  get speed(): Speed {
    return this.snake.speed;
  }

  set speed(value) {
    this.snake.speed = value;
  }

  create(speed: Speed): void {
    this.standardMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.standardMaterial.alpha = 1;
    this.standardMaterial.diffuseColor = BODY_COLOR;
    this.standardMaterial.bumpTexture = new Texture('assets/textures/wGyk6os.png', this.engine.scene);

    this.normalSphereTemplate = Mesh.CreateSphere('NormalSphereTemplate', SEGMENTS, this.bodySize, this.engine.scene);
    this.normalSphereTemplate.material = this.standardMaterial;
    this.normalSphereTemplate.setEnabled(false);

    if (this.snake) {
      this.snake.body.forEach(item => item.mesh.dispose());
    }

    this.snake = {
      body: [],
      speed,
    };

    const head = Mesh.CreateSphere('SnakeHead', SEGMENTS, this.bodySize, this.engine.scene);
    const material = new StandardMaterial('head', this.engine.scene);
    material.alpha = 1;
    material.diffuseColor = HEAD_COLOR;
    head.material = material;
    head.position.y = this.bodySize / 2;
    this.snake.body.push({ mesh: head, targets: [], name: 'head' });

    for (let i = 1; i < 3; i++) {
      const mesh = this.normalSphereTemplate.createInstance(`SnakeTail-${createUuid()}`);
      mesh.position.y = this.bodySize;
      mesh.position.x = i * (this.bodySize + this.speed);
      this.snake.body.push({ mesh, targets: [], name: i.toString() });
      this.engine.shadowGenerator.addShadowCaster(mesh);
    }

    this.engine.shadowGenerator.addShadowCaster(head);
  }

  move(coord: { x: number; y: number; z: number; }): void {
    for (let i = 0; i < this.snake.body.length; i++) {
      const current = this.snake.body[i];
      const before = this.snake.body[i - 1];

      if (i === 0) {
        current.mesh.position.x += coord.x * this.speed;
        current.mesh.position.y += coord.y * FALLING_SPEED;
        current.mesh.position.z += coord.z * this.speed;
      } else {
        // follow
        const target = before.mesh.position.clone();
        const delta = target.subtract(current.mesh.position);
        if (Math.abs(delta.x) > DISTANCE_TAIL || Math.abs(delta.z) > DISTANCE_TAIL) {
          current.mesh.position.x += delta.x * this.speed * TAIL_FOLLOW_SPEED;
          current.mesh.position.z += delta.z * this.speed * TAIL_FOLLOW_SPEED;
          current.mesh.position.y += delta.y * FALLING_SPEED;
        }
      }
    }
  }

  extendTail(): void {
    const last = this.snake.body[this.snake.body.length - 1];
    const mesh = this.normalSphereTemplate.createInstance(`Tail-${createUuid()}`);
    mesh.position.y = last.mesh.position.y;
    mesh.position.z = last.mesh.position.z + (this.bodySize + this.speed);
    mesh.position.x = last.mesh.position.x + (this.bodySize + this.speed);
    this.snake.body.push({ mesh, targets: [], name: `${this.snake.body.length + 1}` });

    this.engine.shadowGenerator.addShadowCaster(mesh);
  }

  kill(): void {
    if (!this.snake) {
      return;
    }
    this.snake.body.forEach(body => body.mesh.dispose());
    this.snake.body = [];
  }
}
