import { Injectable } from '@angular/core';
import { LoggerService } from '@bpa/core';
import { Moment } from 'moment';
import { OfficeService } from '../../modules/offices/services/office.service';
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
    private readonly offices: OfficeService,
  ) {
  }

  async handle(date: Moment): Promise<void> {
    if (!match(date)) {
      return;
    }
    this.logger.debug('handle the properties');

    await this.offices.get().then(
      // eslint-disable-next-line @typescript-eslint/require-await
      async offices => offices.forEach(
        async office => this.credit.substract(office.monthlyCost, `Monatliche Miete ${office.name}`, date),
      ),
    );
  }
}
