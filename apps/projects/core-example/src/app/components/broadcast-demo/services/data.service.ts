import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Badge {
  id: number;
  badge: string;
}

@Injectable()
export class DataService {
  private readonly interval: Observable<Badge[]>;
  private readonly limit = 3000;

  constructor() {
    this.interval = interval(15000)
      .pipe(
        map(data => this.getData()),
        shareReplay(1),
      );
  }

  get$(id: number): Observable<string> {
    return this.interval.pipe(
      map(data => data.find(item => item.id === id)),
      map(data => data ? data.badge : ''),
    );
  }

  private getData(): Badge[] {
    const data: Badge[] = [];
    for (let index = 1; index <= this.limit; index++) {
      if (Math.random() > 0.8) {
        data.push({
          id: index, badge: Math.ceil(Math.random() * 10)
            .toString(),
        });
      }
    }

    return data;
  }
}
