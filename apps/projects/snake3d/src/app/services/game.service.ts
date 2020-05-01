import { ElementRef, Injectable } from '@angular/core';
import { ActionManager, Color3, InstancedMesh, Mesh, StandardMaterial, Vector3 } from '@babylonjs/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { createUuid } from '../../../../core/src/lib/utils/common.util';
import { Direction } from '../app.constants';
import { getDirection, getRelativeCoord } from '../utils/directions.util';
import { EngineService } from './engine.service';

function directionAsNumber(value: number): 1 | -1 | 0 {
  if (value === 0) {
    return 0;
  }
  if (value < 0) {
    return -1;
  }

  return 1;
}

const SEGMENTS = 32;
const SPEED = 0.01;
const LOST_SPEED = 0.2;
const POINTS_PER_MOVE = 0.01;
const POINTS_PER_APPLE = 50;

interface Body {
  mesh: InstancedMesh | Mesh;
  targets: Vector3[];
}

interface Snake {
  body: Body[];
}

interface Result {
  apples: number;
  points: number;
  lost: boolean;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  get result$(): Observable<Result> {
    return this.innerResult$.pipe(
      map(result => ({ ...result, points: Math.floor(result.points) })),
      shareReplay(),
    );
  }

  private readonly innerResult$ = new BehaviorSubject<Result>({ apples: 0, points: 0, lost: false });

  private readonly floor = -50;
  private readonly size = { width: 12, height: 12 };
  private readonly snakeBodySize = 0.5;
  private readonly minGap = 0.01;

  private readonly limitX = (this.size.width + this.snakeBodySize) / 2;
  private readonly limitZ = (this.size.height + this.snakeBodySize) / 2;

  private direction: Direction = Direction.Right;

  private lost = false;
  private result: Result = {
    apples: 0,
    points: 0,
    lost: false,
  };

  private snake: Snake;

  private standardMaterial: StandardMaterial;
  private normalSphereTemplate: Mesh;
  private apple: Mesh;

  constructor(private readonly engine: EngineService) {
  }

  private get speed(): number {
    return this.lost ? LOST_SPEED : SPEED;
  }

  setDirection(direction: Direction): void {
    if (this.lost) {
      return;
    }
    this.direction = getDirection(this.direction, direction);
  }

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    const scene = this.engine.createScene(canvas.nativeElement, this.size);
    this.snake = {
      body: [],
    };

    this.standardMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.standardMaterial.alpha = 1;
    this.standardMaterial.diffuseColor = new Color3(1, 1, 1);

    this.normalSphereTemplate = Mesh.CreateSphere('NormalSphereTemplate', SEGMENTS, this.snakeBodySize, this.engine.scene);
    this.normalSphereTemplate.material = this.standardMaterial;
    this.normalSphereTemplate.setEnabled(false);

    this.createSnake();
    this.createApples();

    this.engine.camera.lockedTarget = this.snake.body[0].mesh;

    scene.actionManager = new ActionManager(scene);
    scene.registerBeforeRender(() => {
      this.beforeRender();
    });
  }

  private beforeRender(): void {
    this.updatePositions();
  }

  private createSnake(): void {
    const head = Mesh.CreateSphere('SnakeHead', SEGMENTS, this.snakeBodySize, this.engine.scene);
    const material = new StandardMaterial('head', this.engine.scene);
    material.alpha = 1;
    material.diffuseColor = new Color3(1, 0.2, 0.7);
    head.material = material;
    head.position.y = this.snakeBodySize;
    this.snake.body.push({ mesh: head, targets: [] });

    for (let i = 1; i < 5; i++) {
      const mesh = this.normalSphereTemplate.createInstance(`SnakeTail-${createUuid()}`);
      mesh.position.y = this.snakeBodySize;
      mesh.position.x = i * (this.snakeBodySize + this.minGap);
      this.snake.body.push({ mesh, targets: [] });
    }
  }

  private createApples(): void {
    if (this.apple === undefined) {
      this.apple = Mesh.CreateSphere('Apple', SEGMENTS, this.snakeBodySize, this.engine.scene);
      const material = new StandardMaterial('Gold', this.engine.scene);
      material.alpha = 1;
      material.diffuseColor = new Color3(0.23, 0.98, 0.53);
      this.apple.material = material;
    }

    this.apple.position.x = Math.floor(Math.random() * this.size.width - this.size.width / 2);
    this.apple.position.z = Math.floor(Math.random() * this.size.height - this.size.height / 2);
  }

  private updatePositions(): void {
    const coord = getRelativeCoord(this.lost ? Direction.Falling : this.direction);

    this.moveSnake(coord);

    const head = this.snake.body[0];
    if (head.mesh.intersectsMesh(this.apple)) {
      this.updateResult(POINTS_PER_APPLE, 1);
      this.extendTail();
      this.createApples();
    }

    if (!this.lost) {
      this.updateResult(POINTS_PER_MOVE);

      if ((Math.abs(head.mesh.position.x) > this.limitX)
        || (Math.abs(head.mesh.position.z) > this.limitZ)) {
        this.lost = true;
        delete this.engine.camera.lockedTarget;
      }
    }

    if (this.result.lost && !this.snake.body.some(item => item.mesh.position.y > this.floor)) {
      this.lose();

      return;
    }

    return;
  }

  private moveSnake(coord: { x: number, y: number, z: number }): void {
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

        current.mesh.position.x += directionAsNumber(delta.x) * SPEED;
        current.mesh.position.y += directionAsNumber(delta.y) * this.speed;
        current.mesh.position.z += directionAsNumber(delta.z) * SPEED;

        if (target.equalsWithEpsilon(current.mesh.position)) {
          current.mesh.position = target.clone();
          current.targets.shift();
        }
      }
    }
  }

  private extendTail(): void {
    const last = this.snake.body[this.snake.body.length - 1];
    const mesh = this.normalSphereTemplate.createInstance(`Tail-${createUuid()}`);
    mesh.position.y = last.mesh.position.y;
    mesh.position.z = last.mesh.position.z + (this.snakeBodySize + this.minGap);
    mesh.position.x = last.mesh.position.x + (this.snakeBodySize + this.minGap);
    this.snake.body.push({ mesh, targets: [] });
  }

  private lose(): void {
    this.result.lost = true;
    this.innerResult$.next(this.result);
  }

  private updateResult(value: number, apple = 0): void {
    if (this.result.lost) {
      return;
    }

    this.result.points += value;
    this.result.apples += apple;
    this.innerResult$.next(this.result);
  }
}
