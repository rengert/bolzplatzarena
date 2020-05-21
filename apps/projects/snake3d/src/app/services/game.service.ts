import { ElementRef, Injectable, NgZone } from '@angular/core';
import { ActionManager, Color3, InstancedMesh, Mesh, StandardMaterial, Vector3 } from '@babylonjs/core';
import moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { createUuid } from '../../../../core/src/lib/utils/common.util';
import { Direction, GameMode, Level } from '../app.constants';
import { Settings } from '../components/settings/settings.component';
import { getDirection, getRelativeCoord } from '../utils/directions.util';
import { EngineService } from './engine.service';
import { HighscoreService } from './highscore.service';

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
const LOST_SPEED = 0.75;
const POINTS_PER_APPLE = 50;

interface Body {
  mesh: InstancedMesh | Mesh;
  targets: Vector3[];
  name: string;
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
    return this.externalResult$;
  }

  private readonly innerResult$ = new BehaviorSubject<Result>({ apples: 0, points: 0, lost: false });
  private readonly externalResult$ = this.innerResult$.pipe(
    map(result => ({ ...result, points: Math.floor(result.points) })),
    distinctUntilChanged((a: Result, b: Result) => a.points === b.points && a.lost === b.lost),
    shareReplay(1),
  );

  private readonly floor = -50;
  private readonly size = { width: 12, height: 12 };
  private readonly snakeBodySize = 0.5;

  private readonly limitX = (this.size.width + this.snakeBodySize) / 2;
  private readonly limitZ = (this.size.height + this.snakeBodySize) / 2;

  private direction: Direction = Direction.Right;

  private lost = false;
  private readonly emptyResult: Result = {
    apples: 0,
    points: 0,
    lost: false,
  };
  private result: Result = { ...this.emptyResult };

  private snake: Snake;

  private standardMaterial: StandardMaterial;
  private normalSphereTemplate: Mesh;
  private apple: Mesh | undefined;

  private readonly settings: Settings;

  constructor(
    private readonly engine: EngineService,
    private readonly highscore: HighscoreService,
    private readonly ngZone: NgZone,
  ) {
    const data = localStorage.getItem('settings');
    const defaultValue = {
      level: Level.Normal,
      gameMode: GameMode.Normal,
      user: 'Anonym',
    };
    this.settings = data === null ? defaultValue : { ...defaultValue, ...(JSON.parse(data) as Settings) };
  }

  private get speed(): number {
    switch (this.settings.level) {
      case(Level.Normal):
        return 0.02;
      case (Level.Hard):
        return 0.05;
      default:
        return SPEED;
    }

    return SPEED;
  }

  setDirection(direction: Direction): void {
    if (this.lost) {
      return;
    }
    this.direction = getDirection(this.direction, direction);
  }

  restart(): void {
    this.reset();
    this.createSnake();
  }

  reset(): void {
    this.direction = Direction.Right;
    this.result = { ...this.emptyResult };
    this.lost = false;
    this.apple = undefined;
    this.ngZone.run(() => this.innerResult$.next(this.result));
  }

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    this.reset();
    const scene = this.engine.createScene(canvas.nativeElement, this.size);

    this.standardMaterial = new StandardMaterial('StandardMaterial', this.engine.scene);
    this.standardMaterial.alpha = 1;
    this.standardMaterial.diffuseColor = new Color3(0.976, 0.737, 0.22);

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
    scene.registerAfterRender(() => {
      this.afterRender();
    });
  }

  async writeScore(): Promise<void> {
    await this.highscore.add({
      id: createUuid(),
      name: this.settings.user,
      score: Math.floor(this.result.points),
      apples: this.result.apples,
      level: this.settings.level,
      gameMode: this.settings.gameMode,
      date: moment()
        .format(),
    });
  }

  private beforeRender(): void {
    if (this.result.lost || !this.snake.body.length) {
      return;
    }

    this.updatePositions();
  }

  private afterRender(): void {
    if (this.result.lost || !this.snake.body.length) {
      return;
    }

    if (!this.lost) {
      this.updateResult(this.speed, 0);

      const head = this.snake.body[0];
      if ((Math.abs(head.mesh.position.x) > this.limitX)
        || (Math.abs(head.mesh.position.z) > this.limitZ)) {
        this.lost = true;
        delete this.engine.camera.lockedTarget;
      }
    }

    if ((this.lost
      && !this.snake.body.some(item => item.mesh.position.y > this.floor))
      || this.intersectsTail()) {
      this.lose();

      return;
    }
  }

  private createSnake(): void {
    this.snake = {
      body: [],
    };

    const head = Mesh.CreateSphere('SnakeHead', SEGMENTS, this.snakeBodySize, this.engine.scene);
    const material = new StandardMaterial('head', this.engine.scene);
    material.alpha = 1;
    material.diffuseColor = new Color3(0.816, 0.457, 0.097);
    head.material = material;
    head.position.y = this.snakeBodySize / 2;
    this.snake.body.push({ mesh: head, targets: [], name: 'head' });

    for (let i = 1; i < 5; i++) {
      const mesh = this.normalSphereTemplate.createInstance(`SnakeTail-${createUuid()}`);
      mesh.position.y = this.snakeBodySize / 2;
      mesh.position.x = i * (this.snakeBodySize + this.speed);
      this.snake.body.push({ mesh, targets: [], name: i.toString() });
      this.engine.shadowGenerator.addShadowCaster(mesh);
    }

    this.engine.shadowGenerator.addShadowCaster(head);
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

    this.engine.spotLight.position.x = this.apple.position.x;
    this.engine.spotLight.position.z = this.apple.position.z;
  }

  private updatePositions(): void {
    const coord = getRelativeCoord(this.lost ? Direction.Falling : this.direction);

    this.moveSnake(coord);

    const head = this.snake.body[0];
    if (head.mesh.intersectsMesh(this.apple !)) {
      this.updateResult(POINTS_PER_APPLE, 1);
      this.extendTail();
      this.createApples();
    }
  }

  private intersectsTail(): boolean {
    const head = this.snake.body[0];

    const crash = this.snake.body.find((item, index) => index > 1
      && head.mesh.intersectsMesh(item.mesh, true),
    );

    if (crash !== undefined) {
      // tslint:disable-next-line:no-console
      console.log(head, crash);
    }

    return crash !== undefined;
  }

  private moveSnake(coord: { x: number, y: number, z: number }): void {
    for (let i = 0; i < this.snake.body.length; i++) {
      const current = this.snake.body[i];
      const next = this.snake.body[i + 1];
      if (next !== undefined) {
        next.targets.push(current.mesh.position.clone());
      }

      if (i === 0) {
        current.mesh.position.x += coord.x * this.speed;
        current.mesh.position.y += coord.y * LOST_SPEED;
        current.mesh.position.z += coord.z * this.speed;
      } else {
        // follow
        const target = current.targets[0];
        const delta = target.subtract(current.mesh.position)
          .normalize();

        current.mesh.position.x += directionAsNumber(delta.x) * this.speed;
        current.mesh.position.y += directionAsNumber(delta.y) * LOST_SPEED;
        current.mesh.position.z += directionAsNumber(delta.z) * this.speed;

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
    mesh.position.z = last.mesh.position.z + (this.snakeBodySize + this.speed);
    mesh.position.x = last.mesh.position.x + (this.snakeBodySize + this.speed);
    this.snake.body.push({ mesh, targets: [], name: `${this.snake.body.length + 1}` });

    this.engine.shadowGenerator.addShadowCaster(mesh);
  }

  private lose(): void {
    this.lost = true;
    this.result.lost = true;
    this.ngZone.run(() => this.innerResult$.next(this.result));
  }

  private updateResult(value: number, apple = 0): void {
    if (this.result.lost) {
      return;
    }

    this.result.points += value;
    this.result.apples += apple;
    this.ngZone.run(() => this.innerResult$.next(this.result));
  }
}
