import { ElementRef, Injectable, NgZone } from '@angular/core';
import { ActionManager, Color3, Mesh, StandardMaterial } from '@babylonjs/core';
import { createUuid } from '@bpa/core';
import moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { GameMode, Level } from '../app.constants';
import { Settings } from '../components/settings/settings.component';
import { EngineService } from './engine.service';
import { HighscoreService } from './highscore.service';
import { SnakeService, Speed } from './snake.service';

const SEGMENTS = 32;
const POINTS_PER_APPLE = 50;

interface Result {
  apples: number;
  points: number;
  lost: boolean;
}

const emptyResult: Result = {
  apples: 0,
  points: 0,
  lost: false,
};

@Injectable({ providedIn: 'root' })
export class GameService {
  get result$(): Observable<Result> {
    return this.externalResult$;
  }

  readonly gamePaused = new BehaviorSubject<boolean>(false);
  readonly speeds: { [key in Level]: Speed } = {
    [Level.easy]: Speed.Slow,
    [Level.normal]: Speed.Normal,
    [Level.hard]: Speed.Fast,
    [Level.faster]: Speed.Faster,
  };

  private readonly innerResult$ = new BehaviorSubject<Result>({ apples: 0, points: 0, lost: false });
  private readonly externalResult$: Observable<Result>;

  private readonly floor = -50;
  private readonly size = { width: 12, height: 12 };

  private readonly limitX: number;
  private readonly limitZ: number;

  private lost = false;

  private result: Result = { ...emptyResult };

  private apple: Mesh | undefined;

  private readonly settings: Settings;

  constructor(
    private readonly engine: EngineService,
    private readonly highscore: HighscoreService,
    private readonly snake: SnakeService,
    private readonly ngZone: NgZone,
  ) {
    this.externalResult$ = this.innerResult$.pipe(
      map(result => ({ ...result, points: Math.floor(result.points) })),
      distinctUntilChanged((a: Result, b: Result) => a.points === b.points && a.lost === b.lost),
      shareReplay(1),
    );

    this.limitX = (this.size.width + this.snake.bodySize) / 2;
    this.limitZ = (this.size.height + this.snake.bodySize) / 2;

    const data = localStorage.getItem('settings');
    const defaultValue = {
      level: Level.normal,
      gameMode: GameMode.normal,
      user: 'Anonym',
    };
    this.settings = data
      ? {
        ...defaultValue,
        ...(JSON.parse(data) as Settings),
      }
      : defaultValue;
  }

  restart(): void {
    this.reset();
    this.snake.create(this.speeds[this.settings.level]);
  }

  reset(): void {
    this.result = { ...emptyResult };
    this.lost = false;
    this.apple?.dispose();
    this.apple = undefined;
    this.ngZone.run(() => this.innerResult$.next(this.result));
    this.gamePaused.next(false);
  }

  init(canvas: ElementRef<HTMLCanvasElement>): void {
    this.reset();
    const scene = this.engine.createScene(canvas.nativeElement, this.size);

    this.snake.create(this.speeds[this.settings.level]);
    this.createApples();

    this.engine.camera.lockedTarget = this.snake.head;

    scene.actionManager = new ActionManager(scene);
    scene.registerBeforeRender(() => {
      this.beforeRender();
    });
    scene.registerAfterRender(() => {
      this.afterRender();
    });
  }

  pause(): void {
    this.gamePaused.next(true);
  }

  continue(): void {
    this.gamePaused.next(false);
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
    if (this.gamePaused.value) {
      return;
    }

    if (this.result.lost || !this.snake.length) {
      return;
    }

    this.updatePositions();
  }

  private afterRender(): void {
    if (this.gamePaused.value) {
      return;
    }

    if (this.result.lost || !this.snake.length) {
      return;
    }

    if (!this.lost) {
      this.updateResult(this.snake.speed, 0);

      const { x, z } = this.snake.position;
      if ((Math.abs(x) > this.limitX) || (Math.abs(z) > this.limitZ)) {
        this.lost = true;

        // eslint-disable-next-line no-null/no-null
        this.engine.camera.lockedTarget = null;
      }
    }

    if ((this.lost
      && !(this.snake.position.y > this.floor))
      || this.snake.intersectsTail) {
      this.lose();

      return;
    }
  }

  private createApples(): void {
    if (this.apple === undefined) {
      this.apple = Mesh.CreateSphere('Apple', SEGMENTS, this.snake.bodySize, this.engine.scene);
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
    const { x, y, z } = this.engine.joystick.deltaPosition;
    this.snake.move({ x: -x, y: this.lost ? -1 : 0, z: -y });

    const head = this.snake.head;
    if (this.apple && head.intersectsMesh(this.apple)) {
      this.updateResult(POINTS_PER_APPLE, 1);
      this.snake.extendTail();
      this.createApples();
    }
  }

  private lose(): void {
    this.lost = true;
    this.result.lost = true;
    this.snake.kill();
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
