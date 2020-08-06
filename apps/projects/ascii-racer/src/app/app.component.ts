import { Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ascii-racer';
  readonly data: Observable<string[][]>;
  readonly speed = 100;
  private readonly trackWitdth = 100;
  private readonly trackLength = 50;

  private last: string[][];
  private track = [25, 35];
  private racerPosition = 20;

  constructor() {
    this.data = timer(0, this.speed).pipe(
      map(_ => this.createTrack()),
    );
  }

  private createTrack(): string[][] {
    if (!this.last) {
      this.last = [];
      for (let i = 0; i < this.trackLength; i++) {
        this.last[i] = [];
        for (let j = 0; j < this.trackWitdth; j++) {
          this.last[i][j] = this.track.includes(j) ? '1' : '0';
        }
      }
    } else {
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
      }
      for (let j = 0; j < this.trackWitdth; j++) {
        this.last[this.trackLength - 1][j] = j < this.track[0] || j > this.track[1] ? '1' : '0';
        if (j === this.racerPosition) {
          this.last[this.trackLength - 1][j] = 'H';
        }
      }
    }

    return this.last;
  }
}
