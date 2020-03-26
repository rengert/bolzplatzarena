import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleSnackBar } from '@angular/material/snack-bar/simple-snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar/snack-bar-ref';
import moment from 'moment';
import { LoggerService } from '../../../../../core/src/lib/modules/logger/services/logger.service';
import { createUuid } from '../../../../../core/src/lib/utils/common.util';
import { Direction, GameMode, Level, Points, Speed } from '../../app.constants';
import { BoardSettings } from '../../models/board-settings.model';
import { Cell } from '../../models/cell.model';
import { ScoreBoard } from '../../models/score-board.model';
import { Snake } from '../../models/snake.model';
import { HighscoreService } from '../../services/highscore.service';
import { Settings } from '../settings/settings.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  gameOver: boolean;
  started: boolean;

  scoreBoard: ScoreBoard = {
    points: 0,
    apples: 0,
  };
  readonly board: Cell[][] = [];
  readonly directions = Direction;

  private readonly settings: Settings;
  private readonly snackBarReferences: MatSnackBarRef<SimpleSnackBar>[] = [];

  private snake: Snake;
  private tempDirection: Direction = Direction.Right;

  constructor(
    private readonly highscore: HighscoreService,
    private readonly logger: LoggerService<BoardComponent>,
    private readonly snackBar: MatSnackBar,
  ) {
    const data = localStorage.getItem('settings');
    const defaultValue = { level: Level.Normal, gameMode: GameMode.Normal };
    this.settings = data === null ? defaultValue : { ...defaultValue, ...(JSON.parse(data) as Settings) };
  }

  get boardSettings(): BoardSettings {
    return {
      interval: this.getInterval(),
      width: 16,
      height: 20,
    };
  }

  ngOnInit(): void {
    this.setup();

    setTimeout(() => {
      this.updatePositions();
    }, 4500);
  }

  ngOnDestroy(): void {
    this.snackBarReferences.forEach(item => item.dismiss());
  }

  @HostListener('window:keydown', ['$event']) handleKeyboardEvents(e: KeyboardEvent): void {
    this.handleDirection(e.keyCode);
  }

  handleDirection(direction: Direction): void {
    this.tempDirection = this.getDirection(this.snake.direction, direction);
  }

  restart(): void {
    this.snackBarReferences.forEach(item => item.dismiss());

    this.setup();

    this.scoreBoard = {
      points: 0,
      apples: 0,
    };

    this.gameOver = false;
    this.started = false;

    setTimeout(() => {
      this.updatePositions();
    }, 4500);
  }

  private setup(): void {
    for (let i = 0; i < this.boardSettings.height; i++) {
      this.board[i] = this.createNewLine(i);
    }

    this.setSnake();

    this.setNewApple();
    this.setNewApple();

    this.tempDirection = Direction.Right;
  }

  private updatePositions(): void {
    this.started = true;

    const coord: { x: number; y: number } = this.moveHead();

    if (this.isOutside(coord) || this.isTail(coord)) {
      if (!this.snake.goldenHead) {
        this.lose();

        return;
      }

      this.snake.goldenHead = false;
    }

    this.scoreBoard.points += (this.settings.gameMode === GameMode.Normal ? Points.perMove : 0);

    const newHead = this.board[coord.x][coord.y];
    newHead.isSnake = true;
    newHead.isHead = true;
    if (newHead.isApple) {
      this.scoreBoard.points += this.snake.goldenHead && newHead.isGoldenApple ? Points.perGoldenApple : Points.perApple;
      this.scoreBoard.apples++;
      this.snake.goldenHead = this.snake.goldenHead || newHead.isGoldenApple;
      newHead.isApple = false;
      newHead.isGoldenApple = false;
      this.setNewApple();
    } else {
      const tail = this.snake.body.pop() !;
      tail.isSnake = this.snake.body.some(item => (item.x === tail.x) && (item.y === tail.y));
    }
    newHead.isGoldenApple = this.snake.goldenHead;

    const head = this.snake.body[0];
    head.isHead = false;
    head.isGoldenApple = false;

    this.snake.body.unshift(newHead);

    setTimeout(() => {
      this.updatePositions();
    }, this.boardSettings.interval);
  }

  private lose(): void {
    this.snackBarReferences.push(this.snackBar.open('Spiel verloren', 'Tja'));
    void this.highscore.add({
      id: createUuid(),
      name: 'Ich bins',
      score: this.scoreBoard.points,
      apples: this.scoreBoard.apples,
      level: this.settings.level,
      gameMode: this.settings.gameMode,
      date: moment()
        .format(),
    });
    this.gameOver = true;
  }

  private moveHead(): { x: number; y: number } {
    const head = this.snake.body[0];
    let x = 0;
    let y = 0;

    switch (this.tempDirection) {
      case Direction.Right:
        y = 1;
        break;
      case Direction.Left:
        y = -1;
        break;
      case Direction.Down:
        x = 1;
        break;
      case Direction.Up:
        x = -1;
        break;
      default:
        break;
    }
    this.snake.direction = this.tempDirection;

    const coord = { x: head.x + x, y: head.y + y };

    if (this.settings.gameMode === GameMode.NoWalls || this.snake.goldenHead) {
      if (coord.x < 0) {
        coord.x = this.boardSettings.height - 1;
        this.snake.goldenHead = false;
      } else if (coord.x === this.boardSettings.height) {
        coord.x = 0;
        this.snake.goldenHead = false;
      }

      if (coord.y < 0) {
        coord.y = this.boardSettings.width - 1;
        this.snake.goldenHead = false;
      } else if (coord.y === this.boardSettings.width) {
        coord.y = 0;
        this.snake.goldenHead = false;
      }
    }

    return coord;
  }

  private getDirection(current: number, newDirection: number): Direction {
    this.logger.debug(`set new direction ${current}: ${newDirection}`);

    const directions = [Direction.Left, Direction.Up, Direction.Right, Direction.Down];
    let index = directions.indexOf(current);
    index += ((newDirection === Direction.Left) ? -1 : (newDirection === Direction.Right) ? 1 : 0);
    if (index < 0) {
      index = directions.length - 1;
    }
    if (index === directions.length) {
      index = 0;
    }

    return directions[index];
  }

  private createNewLine(line: number): Cell[] {
    const data: Cell[] = [];
    for (let j = 0; j < this.boardSettings.width; j++) {
      data[j] = {
        id: `${line}-{j}`,
        x: line,
        y: j,
        isSnake: false,
        isHead: false,
        isApple: false,
        isGoldenApple: false,
      };
    }

    return data;
  }

  private setSnake(): void {
    this.snake = {
      body: [],
      direction: Direction.Right,
      goldenHead: false,
    };

    const snakeHead = this.board[0][2];
    snakeHead.isSnake = true;
    snakeHead.isHead = true;
    this.snake.body.push(snakeHead);
    this.board[0][1].isSnake = true;
    this.board[0][0].isSnake = true;
    this.snake.body.push(this.board[0][1]);
    this.snake.body.push(this.board[0][0]);
  }

  private setNewApple(): void {
    const coord = {
      x: Math.floor(Math.random() * this.boardSettings.height),
      y: Math.floor(Math.random() * this.boardSettings.width),
    };
    if (!this.isTail(coord)) {
      this.board[coord.x][coord.y].isApple = true;
      this.board[coord.x][coord.y].isGoldenApple = (this.settings.gameMode === GameMode.GoldenApple) ? Math.random() > 0.9 : false;

      return;
    }
    this.setNewApple();
  }

  private getInterval(): Speed {
    switch (this.settings.level) {
      case Level.Easy:
        return Speed.Slow;
      case Level.Normal:
        return Speed.Medium;
      case Level.Hard:
        return Speed.Fast;
      case Level.Faster:
        return Speed.Fast - this.scoreBoard.apples;
      default:
        return Speed.Fast;
    }
  }

  private isOutside(coord: { x: number, y: number }): boolean {
    return (coord.x >= this.boardSettings.height) || (coord.y >= this.boardSettings.width) || (coord.x < 0) || (coord.y < 0);
  }

  private isTail(coord: { x: number, y: number }): boolean {
    return this.snake.body.some(cell => (cell.x === coord.x) && (cell.y === coord.y));
  }

}
