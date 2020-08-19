import { Component, HostListener } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

enum Direction {
  Left = 'ArrowLeft',
  Up = 'ArrowUp',
  Right = 'ArrowRight',
  Down = 'ArrowDown',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ascii-racer';
  racerPosition = 20;
  readonly data: Observable<string[][]>;
  readonly speed = 50;
  readonly trackWitdth = 100;
  readonly trackLength = 50;
  racerPositionY = 49;

  private last: string[][];
  private readonly track = [25, 35];

  constructor() {
    this.data = timer(0, this.speed).pipe(
      map(_ => this.updateTrack()),
    );
  }

  @HostListener('window:keydown', ['$event']) handleKeyboardEvents(e: KeyboardEvent): void {
    const direction = e.key as Direction;
    if (direction === Direction.Left) {
      this.racerPosition--;
    }
    if (direction === Direction.Right) {
      this.racerPosition++;
    }
  }

  trackByFn(_: number, item: any): any {
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
    for (let j = 0; j < this.trackWitdth; j++) {
      this.last[this.trackLength - 1][j] = j < this.track[0] || j > this.track[1] ? '1' : '0';
    }

    return this.last.reverse();
  }

  private createTrack(): void {
    this.last = [];
    for (let i = 0; i < this.trackLength; i++) {
      this.last[i] = [];
      for (let j = 0; j < this.trackWitdth; j++) {
        this.last[i][j] = j < this.track[0] || j > this.track[1] ? '1' : '0';
      }
    }
  }
}
