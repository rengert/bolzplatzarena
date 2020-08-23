import { Inject, Injectable } from '@angular/core';
import { createMoment } from '@bpa/core';
import { Moment } from 'moment';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { SIMULATOR, Simulator } from './simulators/simulator';
import { StartupService } from './startup.service';
import { StartupStorageService } from './storage/startup-storage.service';

@Injectable({ providedIn: 'root' })
export class SimulationService {
  readonly date$: Observable<Moment>;
  private readonly date = new BehaviorSubject<Moment | undefined>(undefined);

  // runs every xxx ms
  private readonly speed = 10;

  constructor(
    startup: StartupService,
    startupStorage: StartupStorageService,
    @Inject(SIMULATOR) private readonly simulators: Simulator[] = [],
  ) {
    this.date$ = this.date.pipe(
      filter(value => !!value),
      map(data => data !),
    );

    startup.launched$().pipe(
      filter(data => data),
      first(),
      switchMap(_ => timer(0, this.speed).pipe(
        map(__ => this.date.value),
        map(data => data),
        switchMap(date => {
          if (!date) {
            return startupStorage.getMoment('simulationDate')
              .then(value => value || createMoment('2000-01-01'));
          }

          return of(date);
        }),
        map(date => date.clone().add(1, 'hours')),
        // todo do not use the speeeder .... calculate using speeder
        tap(date => this.date.next(date)),
        switchMap(date => startupStorage.setMoment('simulationDate', date)),
      )),
    ).subscribe();

    this.date$.subscribe(date => this.handleCosts(date.clone()));
  }

  handleCosts(date: Moment): void {
    this.simulators.forEach(simulator => simulator.handle(date));
  }
}
