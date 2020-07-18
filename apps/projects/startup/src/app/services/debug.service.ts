import { Injectable } from '@angular/core';
import { EmployeeService } from '../modules/employee/services/employee.service';
import { StartupService } from './startup.service';
import { AppStorageService } from './storage/app-storage.service';
import { StartupStorageService } from './storage/startup-storage.service';

@Injectable({ providedIn: 'root' })
export class DebugService {
  constructor(
    private readonly appStorage: AppStorageService,
    private readonly employee: EmployeeService,
    private readonly startup: StartupService,
    private readonly startupStorage: StartupStorageService) {
  }

  async deleteOffices(): Promise<void> {
    const startup = await this.startup.get$()
      .toPromise();
    startup.offices = [];
    await this.startup.update(startup)
      .toPromise();
  }

  async deleteStartup(): Promise<void> {
    return this.startupStorage.delete();
  }

  async clearLabourMarket(): Promise<void> {
    await this.appStorage.workers.clear();
    await this.employee.seed();
  }
}
