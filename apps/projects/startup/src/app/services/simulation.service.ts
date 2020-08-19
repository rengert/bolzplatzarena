import { Injectable } from '@angular/core';
import { createMoment } from '@bpa/core';
import { Moment } from 'moment';
import { BehaviorSubject, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SimulationService {
  readonly date$: Observable<Moment>;
  private readonly date = new BehaviorSubject<Moment>(createMoment());

  // runs every xxx ms
  private readonly speed = 1000;

  constructor() {
    this.date$ = this.date;
    timer(0, this.speed).pipe(
      // todo do not use the speeeder .... calculate using speeder
      tap(_ => this.date.next(this.date.value.clone().add(1, 'hours'))),
    ).subscribe();
  }
}
