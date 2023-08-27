import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { createUuid, LoggerService, pop } from '@bpa/core';
import { Direction, GameMode, Points } from '../../../../app.constants';
import { Settings } from '../../../../components/settings/settings.component';
import { BoardSettings } from '../../../../models/board-settings.model';
import { Cell } from '../../../../models/cell.model';
import { ScoreBoard } from '../../../../models/score-board.model';
import { Snake } from '../../../../models/snake.model';
import { HighscoreService } from '../../../../services/highscore.service';
import { BoardService } from '../../services/board.service';
import { getDirection, getRelativeCoord } from '../../services/directions.util';
import { isTail } from '../../services/snake.util';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [BoardService],
})
export class BoardComponent implements OnInit, OnDestroy {
  gameOver: boolean;
  started: boolean;
  scoreBoard: ScoreBoard = {
    points: 0,
    apples: 0,
  };

  readonly board: Cell[][] = [];

  private readonly snackBarReferences: MatSnackBarRef<SimpleSnackBar>[] = [];

  private snake: Snake;
  private tempDirection: Direction = Direction.right;

  constructor(
    private readonly boardService: BoardService,
    private readonly highscore: HighscoreService,
    private readonly snackBar: MatSnackBar,
  ) {
  }

  @HostListener('window:keydown', ['$event']) handleKeyboardEvents(e: KeyboardEvent): void {
    this.handleDirection(e.key as Direction);
  }

  get boardSettings(): BoardSettings {
    return this.boardService.getSettings();
  }

  get settings(): Settings {
    return this.boardSettings.settings;
  }

  ngOnInit(): void {
    this.setup();

    this.nextFrame(true);
  }

  ngOnDestroy(): void {
    this.snackBarReferences.forEach(item => item.dismiss());
  }

  handleDirection(direction: Direction): void {
    this.tempDirection = getDirection(this.snake.direction, direction);
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

    this.nextFrame();
  }

  private setup(): void {
    const settings = this.boardSettings;
    for (let i = 0; i < settings.height; i++) {
      this.board[i] = this.boardService.createNewLine(i, settings);
    }

    this.setSnake();

    this.setNewApple();
    this.setNewApple();

    this.tempDirection = Direction.right;
  }

  private async updatePositions(): Promise<void> {
    this.started = true;

    const coord: { x: number; y: number; } = this.moveHead();

    if (this.isOutside(coord) || isTail(this.snake, coord)) {
      if (!this.snake.goldenHead) {
        await this.lose();

        return;
      }

      this.snake.goldenHead = false;
    }

    this.scoreBoard.points += (this.boardSettings.settings.gameMode === GameMode.normal ? Points.perMove : 0);

    const newHead = this.board[coord.x][coord.y];
    newHead.isSnake = true;
    newHead.isHead = true;
    if (newHead.isApple) {
      this.scoreBoard.points += (
        (this.snake.goldenHead && newHead.isGoldenApple)
          ? Points.perGoldenApple
          : Points.perApple
      );
      this.scoreBoard.apples++;
      this.snake.goldenHead = this.snake.goldenHead || newHead.isGoldenApple;
      newHead.isApple = false;
      newHead.isGoldenApple = false;
      this.setNewApple();
    } else {
      const tail = pop(this.snake.body);
      tail.isSnake = this.snake.body.some(item => (item.x === tail.x) && (item.y === tail.y));
    }
    newHead.isGoldenApple = this.snake.goldenHead;

    const head = this.snake.body[0];
    head.isHead = false;
    head.isGoldenApple = false;

    this.snake.body.unshift(newHead);

    this.updateScoreBoard();

    this.nextFrame();
  }

  private updateScoreBoard(): void {
    this.scoreBoard = { ...this.scoreBoard };
  }

  private async lose(): Promise<void> {
    this.snackBarReferences.push(this.snackBar.open('Spiel verloren', 'Tja'));
    await this.highscore.add({
      id: createUuid(),
      name: this.settings.user,
      score: this.scoreBoard.points,
      apples: this.scoreBoard.apples,
      level: this.settings.level,
      gameMode: this.settings.gameMode,
      date: new Date().toISOString(),
    });
    this.gameOver = true;
  }

  private moveHead(): { x: number; y: number; } {
    const head = this.snake.body[0];
    const { x, y } = getRelativeCoord(this.tempDirection);
    const coord = { x: head.x + x, y: head.y + y };

    this.snake.direction = this.tempDirection;

    if (this.settings.gameMode === GameMode.noWalls || this.snake.goldenHead) {
      coord.x = this.getCoordSafe(coord.x, this.boardSettings.height);
      coord.y = this.getCoordSafe(coord.y, this.boardSettings.width);
    }

    return coord;
  }

  private getCoordSafe(value: number, limit: number): number {
    let result = value;
    if (value < 0) {
      result = limit - 1;
      this.snake.goldenHead = false;
    } else if (value === limit) {
      result = 0;
      this.snake.goldenHead = false;
    }

    return result;
  }

  private setSnake(): void {
    this.snake = {
      body: [],
      direction: Direction.right,
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
    if (!isTail(this.snake, coord)) {
      this.board[coord.x][coord.y].isApple = true;
      this.board[coord.x][coord.y].isGoldenApple = (this.settings.gameMode === GameMode.goldenApple)
        ? Math.random() < this.boardSettings.chanceGoldenApple
        : false;

      return;
    }
    this.setNewApple();
  }

  private isOutside(coord: { x: number; y: number; }): boolean {
    return (coord.x >= this.boardSettings.height)
      || (coord.y >= this.boardSettings.width)
      || (coord.x < 0)
      || (coord.y < 0);
  }

  private nextFrame(first = false): void {
    setTimeout(async () => {
      await this.updatePositions();
    }, first ? this.boardSettings.startDelay : this.boardSettings.interval);
  }
}
