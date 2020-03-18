import { Component, HostListener, OnInit } from '@angular/core';
import { Directions } from '../../app.constants';

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

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  readonly board: Cell[][] = [];
  readonly interval = 500;
  readonly snake: Snake = {
    body: [],
    direction: Directions.Right,
  };
  private readonly boardSize = 24;

  private tempDirection: Directions;

  ngOnInit(): void {
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
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

    this.board[Math.floor(Math.random() * this.boardSize)][Math.floor(Math.random() * this.boardSize)].isApple = true;
    this.board[Math.floor(Math.random() * this.boardSize)][Math.floor(Math.random() * this.boardSize)].isApple = true;
    this.board[Math.floor(Math.random() * this.boardSize)][Math.floor(Math.random() * this.boardSize)].isApple = true;

    const cell = this.board[0][0];
    cell.isHead = true;
    cell.isSnake = true;
    this.snake.body.push(cell);
    let body = this.board[0][1];
    body.isSnake = true;
    this.snake.body.push(body);
    body = this.board[0][2];
    body.isSnake = true;
    this.snake.body.push(body);

    this.updatePositions();
  }

  updatePositions(): void {
    const coord: { x: number; y: number } = this.moveHead();

    const head = this.snake.body[0];
    const tail = this.snake.body.pop() !;

    head.isHead = false;
    tail.isSnake = false;
    const newHead = this.board[coord.x][coord.y];
    newHead.isSnake = true;
    newHead.isHead = true;
    this.snake.body.unshift(newHead);

    setTimeout(() => {
      this.updatePositions();
    }, this.interval);
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
    if (e.keyCode === Directions.Left && this.snake.direction !== Directions.Right) {
      this.tempDirection = Directions.Left;
    } else if (e.keyCode === Directions.Up && this.snake.direction !== Directions.Down) {
      this.tempDirection = Directions.Up;
    } else if (e.keyCode === Directions.Right && this.snake.direction !== Directions.Left) {
      this.tempDirection = Directions.Right;
    } else if (e.keyCode === Directions.Down && this.snake.direction !== Directions.Up) {
      this.tempDirection = Directions.Down;
    }
  }
}
