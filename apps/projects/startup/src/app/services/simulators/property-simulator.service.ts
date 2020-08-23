import { Injectable } from '@angular/core';
import { LoggerService } from '@bpa/core';
import { Moment } from 'moment';
import { CreditService } from '../credit.service';
import { Simulator } from './simulator';

function match(date: Moment): boolean {
  return date.hour() === 0 && date.date() === 1;
}

@Injectable({ providedIn: 'root' })
export class PropertySimulatorService implements Simulator {
  constructor(
    private readonly credit: CreditService,
    private readonly logger: LoggerService<PropertySimulatorService>,
  ) {
  }

  async handle(date: Moment): Promise<void> {
    if (!match(date)) {
      return;
    }
    this.logger.debug('handle the properties');

    await this.credit.change(-1000, 'Monatliche Miete', date);
  }
}
