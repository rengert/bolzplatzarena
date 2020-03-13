import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { Startup } from '../models/startup.model';
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

  deleteOffices(): Observable<Startup> {
    return this.startup.get$()
      .pipe(
        first(),
        tap(startup => startup.offices = []),
        switchMap(startup => this.startup.update(startup)),
      );
  }

  async deleteStartup(): Promise<void> {
    return this.startupStorage.delete();
  }

  async clearLabourMarket(): Promise<void> {
    await this.appStorage.workers.clear();
    await this.employee.seed();
  }
}
