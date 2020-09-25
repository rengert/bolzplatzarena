import { Inject, Injectable } from '@angular/core';
import { Moment } from 'moment';
import { SIMULATOR, Simulator } from './simulators/simulator';
import { TimeSimulatorService } from './simulators/time-simulator.service';
import { StartupService } from './startup.service';

@Injectable({ providedIn: 'root' })
export class SimulationService {
  private readonly workers: Worker[] = [];

  constructor(
    startup: StartupService,
    timeSimulator: TimeSimulatorService,
    @Inject(SIMULATOR) private readonly simulators: Simulator[] = [],
  ) {
    timeSimulator.date$.subscribe(date => this.handle(date.clone()));
  }

  handle(date: Moment): void {
    this.simulators.forEach(simulator => simulator.handle(date));
    this.workers.forEach(worker => worker.postMessage({ command: 'bähm', date: date.format() }));
  }

  registerWorker(worker: Worker): void {
    this.workers.push(worker);
  }
}
