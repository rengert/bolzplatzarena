import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Directions, Level } from '../../app.constants';
import { Settings } from '../settings/settings.component';

interface Cell {
  id: string;
  x: number;
  y: number;
  isHead: boolean;
  isSnake: boolean;
  isApple: boolean;
}

interface Snake {
  direction: Directions;
  body: Cell[];
}

interface BoardSettings {
  interval: number;
}

interface ScoreBoard {
  points: number;
  apples: number;
}

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
    direction: Directions.Right,
  };
  readonly Directions = Directions;

  private readonly settings: Settings;
  private readonly boardSizeWidth = 16;
  private readonly boardSizeHeight = 25;

  private tempDirection: Directions;

  constructor(private readonly snackBar: MatSnackBar) {
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
      this.board[i] = [];
      for (let j = 0; j < this.boardSizeWidth; j++) {
        this.board[i][j] = {
          id: `${i}-{j}`,
          x: i,
          y: j,
          isSnake: false,
          isHead: false,
          isApple: false,
        };
      }
    }

    this.setNewApple();
    this.setNewApple();

    let body = this.board[0][2];
    body.isSnake = true;
    body.isHead = true;
    this.snake.body.push(body);
    const cell = this.board[0][1];
    cell.isSnake = true;
    this.snake.body.push(cell);
    body = this.board[0][0];
    body.isSnake = true;
    this.snake.body.push(body);

    setTimeout(() => {
      this.updatePositions();
    }, 4500);
  }

  updatePositions(): void {
    const coord: { x: number; y: number } = this.moveHead();

    if ((coord.x >= this.boardSizeHeight)
      || (coord.y >= this.boardSizeWidth)
      || (coord.x < 0) || (coord.y < 0)) {
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

  moveHead(): { x: number; y: number } {
    const head = this.snake.body[0];
    let x = 0;
    let y = 0;

    switch (this.tempDirection) {
      case Directions.Right:
        y = 1;
        break;
      case Directions.Left:
        y = -1;
        break;
      case Directions.Down:
        x = 1;
        break;
      case Directions.Up:
        x = -1;
        break;
      default:
        y = 1;
        break;
    }
    this.snake.direction = this.tempDirection;

    return { x: head.x + x, y: head.y + y };
  }

  @HostListener('window:keydown', ['$event']) handleKeyboardEvents(e: KeyboardEvent): void {
    this.handleDirection(e.keyCode);
  }

  handleDirection(direction: Directions): void {
    switch (direction) {
      case Directions.Left:
        switch (this.snake.direction) {
          case Directions.Left:
            this.tempDirection = Directions.Down;
            break;
          case Directions.Up:
            this.tempDirection = Directions.Left;
            break;
          case Directions.Down:
            this.tempDirection = Directions.Right;
            break;
          case Directions.Right:
            this.tempDirection = Directions.Up;
            break;
          default:
            this.tempDirection = Directions.Up;
        }
        break;

      case Directions.Right:
        switch (this.snake.direction) {
          case Directions.Left:
            this.tempDirection = Directions.Up;
            break;
          case Directions.Up:
            this.tempDirection = Directions.Right;
            break;
          case Directions.Down:
            this.tempDirection = Directions.Left;
            break;
          case Directions.Right:
            this.tempDirection = Directions.Down;
            break;
          default:
            this.tempDirection = Directions.Down;
        }
        break;
      default:
    }
  }

  private setNewApple(): void {
    this.board[Math.floor(Math.random() * this.boardSizeHeight)][Math.floor(Math.random() * this.boardSizeWidth)].isApple = true;
  }

  private getInterval(): number {
    switch (this.settings.level) {
      case Level.Easy:
        return 700;
      case Level.Normal:
        return 250;
      case Level.Hard:
        return 100;
      default:
        return 100;
    }
  }
}
