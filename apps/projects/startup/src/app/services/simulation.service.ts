import { Inject, Injectable } from '@angular/core';
import { Moment } from 'moment';
import { SIMULATOR, Simulator } from './simulators/simulator';
import { TimeSimulatorService } from './simulators/time-simulator.service';
import { StartupService } from './startup.service';

@Injectable({ providedIn: 'root' })
export class SimulationService {
  constructor(
    startup: StartupService,
    timeSimulator: TimeSimulatorService,
    @Inject(SIMULATOR) private readonly simulators: Simulator[] = [],
  ) {
    timeSimulator.date$.subscribe(date => this.handleCosts(date.clone()));
  }

  handleCosts(date: Moment): void {
    this.simulators.forEach(simulator => simulator.handle(date));
  }
}
