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
  readonly Directions = Directions;
  private readonly boardSize = 12;

  private tempDirection: Directions;

  ngOnInit(): void {
    for (let i = 0; i < this.boardSize * 2; i++) {
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
    this.handleDirection(e.keyCode);
  }

  handleDirection(direction: Directions): void {
    switch (direction) {
      case Directions.Left:
        console.log('left');
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
        console.log('right');
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
}
