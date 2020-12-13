import { Injectable } from '@angular/core';
import { EmployeeService } from '../modules/employee/services/employee.service';
import { MoneyService } from './money.service';
import { StartupService } from './startup.service';
import { AppStorageService } from './storage/app-storage.service';

@Injectable({ providedIn: 'root' })
export class DebugService {
  constructor(
    private readonly appStorage: AppStorageService,
    private readonly credit: MoneyService,
    private readonly employee: EmployeeService,
    private readonly startup: StartupService,
  ) {
  }

  async deleteOffices(): Promise<void> {
    const startup = await this.startup.get();
    startup.offices = [];
    await this.startup.update(startup);
  }

  async deleteStartup(): Promise<void> {
    return this.startup.delete();
  }

  async clearLabourMarket(): Promise<void> {
    await this.employee.clear();
    await this.employee.seed();
  }

  async changeCredit(value: number, add: boolean): Promise<void> {
    await (add
      ? this.credit.add(value)
      : this.credit.substract(value));
  }

  reset(): void {
    localStorage.clear();
    indexedDB.deleteDatabase('startup');
    indexedDB.deleteDatabase('ngStorage');
  }
}
