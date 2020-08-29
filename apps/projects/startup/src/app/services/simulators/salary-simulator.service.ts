import { Injectable } from '@angular/core';
import { LoggerService } from '@bpa/core';
import { Moment } from 'moment';
import { CONSTANTS } from '../../constants';
import { EmployeeStorageService } from '../../modules/employee/services/storage/employee-storage.service';
import { CreditService } from '../credit.service';
import { Simulator } from './simulator';

function matchMonthly(date: Moment): boolean {
  return date.hour() === 0 && date.date() === 1;
}

function matchYearly(date: Moment): boolean {
  return date.hour() === 0
    && date.month() === 1
    && date.date() === 1;
}

@Injectable({ providedIn: 'root' })
export class SalarySimulatorService implements Simulator {
  constructor(
    private readonly credit: CreditService,
    private readonly employeeStorage: EmployeeStorageService,
    private readonly logger: LoggerService<SalarySimulatorService>,
  ) {
  }

  async handle(date: Moment): Promise<void> {
    await this.handleMonthly(date);
    await this.handleYearly(date);
  }

  private async handleMonthly(date: Moment): Promise<void> {
    if (!matchMonthly(date)) {
      return;
    }
    this.logger.debug('handle the salary');

    const workers = await this.employeeStorage.getEmployed();
    for (const worker of workers) {
      await this.credit.substract(worker.salary, `Monatliches Gehalt ${worker.firstname} ${worker.lastname}`, date);
    }
  }

  private async handleYearly(date: Moment): Promise<void> {
    if (!matchYearly(date)) {
      return;
    }
    this.logger.debug('handle the bonus / christmas');

    await this.employeeStorage.getEmployed().then(
      async workers => {
        for (const worker of workers) {
          await this.credit.substract(CONSTANTS.worker.payment.christmas, `Weihnachtsgeld ${worker.firstname} ${worker.lastname}`, date);
          await this.credit.substract(CONSTANTS.worker.payment.bonus, `Bonus ${worker.firstname} ${worker.lastname}`, date);
        }
      },
    );
  }
}
