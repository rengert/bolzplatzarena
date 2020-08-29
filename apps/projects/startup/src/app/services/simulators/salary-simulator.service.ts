import { Injectable } from '@angular/core';
import { LoggerService } from '@bpa/core';
import { Moment } from 'moment';
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

    await this.employeeStorage.getEmployed().then(
      async workers => workers.forEach(
        worker => this.credit.change(-worker.salary, `Monatliches Gehalt ${worker.firstname} ${worker.lastname}`, date)),
    );
  }

  private async handleYearly(date: Moment): Promise<void> {
    if (!matchYearly(date)) {
      return;
    }
    this.logger.debug('handle the bonus / christmas');

    await this.employeeStorage.getEmployed$().toPromise().then(
      async workers => workers.forEach(
        worker => {
          this.credit.change(-1000, `Weihnachtsgeld ${worker.firstname} ${worker.lastname}`, date);
          this.credit.change(-1500, `Bonus ${worker.firstname} ${worker.lastname}`, date);
        }),
    );
  }
}
