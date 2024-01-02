import { AsyncPipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { last, round } from 'lodash';
import { Observable, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// eslint-disable-next-line no-shadow
enum Direction {
  left = 'ArrowLeft',
  up = 'ArrowUp',
  right = 'ArrowRight',
  down = 'ArrowDown',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class AppComponent {
  protected readonly data$: Observable<string[][]>;
  protected readonly speed = 50;
  protected readonly trackWidth = 100;
  protected readonly trackLength = 50;

  protected title = 'ascii-racer';
  protected racerPosition = 20;
  protected racerPositionY = 49;

  protected crashs = 0;
  protected way = 0;

  private last: string[][];
  private readonly track = [15, 35];

  constructor() {
    this.data$ = timer(0, this.speed).pipe(
      map(() => this.updateTrack()),
      tap(() => this.way = round(this.way + 0.001, 3)),
      tap(data => this.check(data)),
    );
  }

  @HostListener('window:keydown', ['$event'])
  protected handleKeyboardEvents(e: KeyboardEvent): void {
    const direction = e.key as Direction;
    if (direction === Direction.left) {
      this.racerPosition -= 1;
    }
    if (direction === Direction.right) {
      this.racerPosition += 1;
    }
  }

  protected trackByFn(_: number, item: unknown): unknown {
    return item;
  }

  private updateTrack(): string[][] {
    if (!this.last) {
      this.createTrack();
    }
    this.last = this.last.reverse();
    this.last = this.last.splice(1, this.last.length - 1);
    this.last[this.trackLength - 1] = [];
    const random = Math.floor(Math.random() * 3);
    switch (random) {
      case 0:
        this.track[0] += 1;
        this.track[1] += 1;
        break;
      case 1:
        if (this.track[0] > 0) {
          this.track[0] -= 1;
          this.track[1] -= 1;
        }
        break;
      default:
        break;
    }
    for (let j = 0; j < this.trackWidth; j++) {
      this.last[this.trackLength - 1][j] = j < this.track[0] || j > this.track[1] ? '1' : '8';
      if (j === this.track[0] + 10) {
        this.last[this.trackLength - 1][j] = '|';
      }
    }

    return this.last.reverse();
  }

  private createTrack(): void {
    this.last = [];
    for (let i = 0; i < this.trackLength; i++) {
      this.last[i] = [];
      for (let j = 0; j < this.trackWidth; j++) {
        this.last[i][j] = j < this.track[0] || j > this.track[1] ? '1' : '8';
        if (j === this.track[0] + 10) {
          this.last[i][j] = '|';
        }
      }
    }
  }

  private check(data: string[][]): void {
    const lastLine = last(data);
    if (lastLine && lastLine[this.racerPosition] === '1') {
      this.crashs++;
      console.log('Das war ein Unfall');
    }
  }
}
