import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../../../../core/src/lib/modules/logger/services/logger.service';
import { Direction, Level, Speed } from '../../app.constants';
import { BoardSettings } from '../../models/board-settings.model';
import { Cell } from '../../models/cell.model';
import { ScoreBoard } from '../../models/score-board.model';
import { Snake } from '../../models/snake.model';
import { Settings } from '../settings/settings.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  readonly scoreBoard: ScoreBoard = {
    points: 0,
    apples: 0,
  };
  readonly board: Cell[][] = [];
  readonly snake: Snake = {
    body: [],
    direction: Direction.Right,
  };
  readonly directions = Direction;

  private readonly settings: Settings;
  private readonly boardSizeWidth = 16;
  private readonly boardSizeHeight = 20;

  private tempDirection: Direction = Direction.Right;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly logger: LoggerService<BoardComponent>,
  ) {
    const data = localStorage.getItem('settings');
    this.settings = data === null ? { level: Level.Normal } : JSON.parse(data) as Settings;
  }

  get boardSettings(): BoardSettings {
    return {
      interval: this.getInterval(),
    };
  }

  ngOnInit(): void {
    for (let i = 0; i < this.boardSizeHeight; i++) {
      this.board[i] = this.createNewLine(i);
    }

    this.setNewApple();
    this.setNewApple();

    this.setSnake();

    setTimeout(() => {
      this.updatePositions();
    }, 4500);
  }

  @HostListener('window:keydown', ['$event']) handleKeyboardEvents(e: KeyboardEvent): void {
    this.handleDirection(e.keyCode);
  }

  handleDirection(direction: Direction): void {
    this.tempDirection = this.getDirection(this.snake.direction, direction);
  }

  private updatePositions(): void {
    const coord: { x: number; y: number } = this.moveHead();

    if (this.isOutside(coord) || this.isTail(coord)) {
      this.snackBar.open('Spiel verloren', 'Tja');

      return;
    }

    this.scoreBoard.points++;

    const newHead = this.board[coord.x][coord.y];
    newHead.isSnake = true;
    newHead.isHead = true;
    if (newHead.isApple) {
      this.scoreBoard.points += 50;
      this.scoreBoard.apples += 1;
      newHead.isApple = false;
      this.setNewApple();
    } else {
      const tail = this.snake.body.pop() !;
      tail.isSnake = false;
    }

    const head = this.snake.body[0];
    head.isHead = false;

    this.snake.body.unshift(newHead);

    setTimeout(() => {
      this.updatePositions();
    }, this.boardSettings.interval);
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
        y = 1;
        break;
    }
    this.snake.direction = this.tempDirection;

    return { x: head.x + x, y: head.y + y };
  }

  private getDirection(current: number, newDirection: number): Direction {
    this.logger.debug(`set new direction ${current}: ${newDirection}`);

    const directions = [Direction.Left, Direction.Up, Direction.Right, Direction.Down];
    let index = directions.indexOf(current);
    index += (newDirection === Direction.Left ? -1 : 1);
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
    for (let j = 0; j < this.boardSizeWidth; j++) {
      data[j] = {
        id: `${line}-{j}`,
        x: line,
        y: j,
        isSnake: false,
        isHead: false,
        isApple: false,
      };
    }

    return data;
  }

  private setSnake(): void {
    const snakeHead = this.board[0][2];
    snakeHead.isSnake = true;
    snakeHead.isHead = true;
    this.snake.body.push(snakeHead);
    this.board[0][1].isSnake = true;
    this.board[0][0].isSnake = true;
    this.snake.body.push(this.board[0][1]);
    this.snake.body.push(this.board[0][0]);
    this.snake.direction = Direction.Right;
  }

  private setNewApple(): void {
    const coord = { x: Math.floor(Math.random() * this.boardSizeHeight), y: Math.floor(Math.random() * this.boardSizeWidth) };
    if (!this.isTail(coord)) {
      this.board[coord.x][coord.y].isApple = true;

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
    return (coord.x >= this.boardSizeHeight) || (coord.y >= this.boardSizeWidth) || (coord.x < 0) || (coord.y < 0);
  }

  private isTail(coord: { x: number, y: number }): boolean {
    return this.snake.body.some(cell => (cell.x === coord.x) && (cell.y === coord.y));
  }
}
