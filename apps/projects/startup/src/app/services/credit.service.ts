import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { TimeSimulatorService } from './simulators/time-simulator.service';
import { StartupService } from './startup.service';
import { CreditStorageService } from './storage/credit-storage.service';

@Injectable({ providedIn: 'root' })
export class CreditService {
  private date: Moment;

  constructor(
    private readonly creditStorage: CreditStorageService,
    private readonly startup: StartupService,
    timeSimulator: TimeSimulatorService,
  ) {
    timeSimulator.date$.subscribe(date => this.date = date);
  }

  async add(value: number, reason?: string, date = this.date): Promise<void> {
    await this.change(value, reason, date);
  }

  async substract(value: number, reason?: string, date = this.date): Promise<void> {
    await this.change(-value, reason, date);
  }

  private async change(value: number, reason?: string, date = this.date): Promise<void> {
    const startUp = await this.startup.get$();
    startUp.credit += value;
    await this.startup.update(startUp)
      .toPromise();

    if (reason) {
      await this.audit(value, reason, date);
    }
  }

  private async audit(value: number, reason: string, date: Moment): Promise<void> {
    await this.creditStorage.addAudit(value, reason, date);
  }
}
