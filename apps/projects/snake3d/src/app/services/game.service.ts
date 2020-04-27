import { ElementRef, Injectable } from '@angular/core';
import { Color3, InstancedMesh, Mesh, StandardMaterial, Vector3 } from '@babylonjs/core';
import { BehaviorSubject } from 'rxjs';
import { createUuid } from '../../../../core/src/lib/utils/common.util';
import { Direction } from '../app.constants';
import { getDirection, getRelativeCoord } from '../utils/directions.util';
import { EngineService } from './engine.service';

const SPEED = 0.01;
const LOST_SPEED = 0.2;

const COUNT_PER_MOVE = 0.01;

interface Body {
  mesh: InstancedMesh | Mesh;
  targets: Vector3[];
}

interface Snake {
  body: Body[];
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly result$ = new BehaviorSubject<number>(0);

  readonly floor = -50;
  readonly size = { width: 12, height: 12 };
  readonly snakeBodySize = 0.5;
  readonly minGap = 0.01;

  private direction: Direction = Direction.Right;

  private lost = false;
  private result = 0;

  private snake: Snake;

  private standardMaterial: StandardMaterial;
  private normalSphereTemplate: Mesh;
  private apple: Mesh;

  constructor(private readonly engine: EngineService) {
  }

  get speed(): number {
    return this.lost ? LOST_SPEED : SPEED;
  }

  setDirection(direction: Direction): void {
    if (this.lost) {
      return;
    }
    this.direction = getDirection(this.direction, direction);
  }

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    this.engine.createScene(canvas.nativeElement, this.size);
    this.snake = {
      body: [],
    };

    this.standardMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.standardMaterial.alpha = 1;
    this.standardMaterial.diffuseColor = new Color3(1, 1, 1);

    this.normalSphereTemplate = Mesh.CreateSphere('NormalSphereTemplate', 32, this.snakeBodySize, this.engine.scene);
    this.normalSphereTemplate.material = this.standardMaterial;
    this.normalSphereTemplate.setEnabled(false);

    const head = Mesh.CreateSphere('SnakeHead', 32, this.snakeBodySize, this.engine.scene);
    const material = new StandardMaterial('head', this.engine.scene);
    material.alpha = 1;
    material.diffuseColor = new Color3(1, 0.2, 0.7);
    head.material = material;
    head.position.y = this.snakeBodySize;
    this.snake.body.push({ mesh: head, targets: [] });

    for (let i = 1; i < 5; i++) {
      const mesh = this.normalSphereTemplate.createInstance(`SnakeTail-${createUuid()}`);
      mesh.position.y = 0.5;
      mesh.position.x = i * (this.snakeBodySize + this.minGap);
      this.snake.body.push({ mesh, targets: [] });
    }

    this.engine.camera.lockedTarget = head;

    this.createApples();

    this.nextFrame();
  }

  private createApples(): void {
    if (this.apple === undefined) {
      this.apple = Mesh.CreateSphere('Apple', 32, this.snakeBodySize, this.engine.scene);
      const material = new StandardMaterial('Gold', this.engine.scene);
      material.alpha = 1;
      material.diffuseColor = new Color3(0.23, 0.98, 0.53);
      this.apple.material = material;
    }

    this.apple.position.x = Math.floor(Math.random() * this.size.width - this.size.width / 2);
    this.apple.position.z = Math.floor(Math.random() * this.size.height - this.size.height / 2);
  }

  private nextFrame(): void {
    setTimeout(async () => {
      await this.updatePositions();
    }, 16);
  }

  private async updatePositions(): Promise<void> {
    const coord = getRelativeCoord(this.lost ? Direction.Falling : this.direction);

    for (let i = 0; i < this.snake.body.length; i++) {
      const current = this.snake.body[i];
      const next = this.snake.body[i + 1];
      if (next !== undefined) {
        next.targets.push(current.mesh.position.clone());
      }

      if (i === 0) {
        current.mesh.position.x += coord.x * SPEED;
        current.mesh.position.y += coord.y * this.speed;
        current.mesh.position.z += coord.z * SPEED;
      } else {
        // follow
        const target = current.targets[0];
        const delta = target.subtract(current.mesh.position)
          .normalize();

        current.mesh.position.x += delta.x > 0 ? SPEED : 0;
        current.mesh.position.x -= delta.x < 0 ? SPEED : 0;
        current.mesh.position.y += delta.y > 0 ? this.speed : 0;
        current.mesh.position.y -= delta.y < 0 ? this.speed : 0;
        current.mesh.position.z += delta.z > 0 ? SPEED : 0;
        current.mesh.position.z -= delta.z < 0 ? SPEED : 0;

        if (target.equalsWithEpsilon(current.mesh.position)) {
          current.mesh.position = target.clone();
          current.targets.shift();
        }
      }
    }

    const head = this.snake.body[0];
    if (head.mesh.intersectsMesh(this.apple)) {
      this.createApples();
      this.updateResult(50);
      const last = this.snake.body[this.snake.body.length - 1];

      const mesh = this.normalSphereTemplate.createInstance(`Tail-${createUuid()}`);
      mesh.position.y = last.mesh.position.y;
      mesh.position.z = last.mesh.position.z + (this.snakeBodySize + this.minGap);
      mesh.position.x = last.mesh.position.x + (this.snakeBodySize + this.minGap);

      this.snake.body.push({ mesh, targets: [] });
    }
    this.updateResult(COUNT_PER_MOVE);

    const limitX = (this.size.width + this.snakeBodySize) / 2;
    const limitZ = (this.size.height + this.snakeBodySize) / 2;
    if ((Math.abs(head.mesh.position.x) > limitX)
      || (Math.abs(head.mesh.position.z) > limitZ)) {
      this.lost = true;
      delete this.engine.camera.lockedTarget;
    }

    if (this.lost && !this.snake.body.some(item => item.mesh.position.y > this.floor)) {
      // alert('Sie haben leider verloren!');

      return;
    }

    this.nextFrame();

    return;
  }

  private updateResult(value: number): void {
    this.result += value;
    this.result$.next(this.result);
  }
}
