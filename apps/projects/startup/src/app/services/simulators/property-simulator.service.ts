import { Injectable } from '@angular/core';
import { LoggerService } from '@bpa/core';
import { Moment } from 'moment';
import { OfficeService } from '../../modules/offices/services/office.service';
import { MoneyService } from '../money.service';
import { Simulator } from './simulator';

function match(date: Moment): boolean {
  return date.hour() === 0 && date.date() === 1;
}

@Injectable({ providedIn: 'root' })
export class PropertySimulatorService implements Simulator {
  constructor(
    private readonly credit: MoneyService,
    private readonly logger: LoggerService<PropertySimulatorService>,
    private readonly offices: OfficeService,
  ) {
  }

  async handle(date: Moment): Promise<void> {
    if (!match(date)) {
      return;
    }
    this.logger.debug('handle the properties');

    const offices = await this.offices.get();
    for(const office of offices) {
      await this.credit.substract(office.monthlyCost, `Monatliche Miete ${office.name}`, date)
    }
  }
}
