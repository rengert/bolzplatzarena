import { Injectable } from '@angular/core';
import { createMoment } from '@bpa/core';
import { Moment } from 'moment';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { StartupService } from '../startup.service';

@Injectable({ providedIn: 'root' })
export class TimeSimulatorService {
  readonly date$: Observable<Moment>;
  private readonly date = new BehaviorSubject<Moment | undefined>(undefined);

  // runs every xxx ms
  private readonly speed = 100;

  get time(): Moment {
    return this.date.getValue() !;
  }

  constructor(startup: StartupService) {
    this.date$ = this.date.pipe(
      filter(value => !!value),
      map(data => data !),
    );

    startup.launched$().pipe(
      filter(data => data),
      first(),
      switchMap(_ => timer(0, this.speed).pipe(
        map(__ => this.date.value),
        map(date => {
          if (!date) {
            const item = localStorage.getItem('simulationDate');

            return createMoment(item ? item : '2000-01-01');
          }

          return date;
        }),
        map(date => date.clone().add(1, 'hours')),
        // todo do not use the speeeder .... calculate using speeder
        tap(date => this.date.next(date)),
        tap(date => localStorage.setItem('simulationDate', date.format('YYYY-MM-DDTHH:mm:ss'))),
      )),
    ).subscribe();
  }
}
