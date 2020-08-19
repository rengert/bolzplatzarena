import { Injectable } from '@angular/core';
import { createMoment } from '@bpa/core';
import { Moment } from 'moment';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { StartupStorageService } from './storage/startup-storage.service';

@Injectable({ providedIn: 'root' })
export class SimulationService {
  readonly date$: Observable<Moment>;
  private readonly date = new BehaviorSubject<Moment | undefined>(undefined);

  // runs every xxx ms
  private readonly speed = 1000;

  constructor(private readonly startupStorage: StartupStorageService) {
    this.date$ = this.date.pipe(
      filter(value => !!value),
      map(data => data !),
    );
    timer(0, this.speed).pipe(
      map(_ => this.date.value),
      map(data => data),
      switchMap(date => {
        if (!date) {
          return this.startupStorage.getMoment('simulationDate')
            .then(value => value || createMoment('2000-01-01'));
        }

        return of(date);
      }),
      map(date => date.clone().add(1, 'hours')),
      // todo do not use the speeeder .... calculate using speeder
      tap(date => this.date.next(date)),
      switchMap(date => this.startupStorage.setMoment('simulationDate', date)),
    ).subscribe();
  }
}
