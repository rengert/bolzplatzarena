import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { Startup } from '../models/startup.model';
import { StartupService } from './startup.service';
import { StartupStorageService } from './storage/startup-storage.service';

@Injectable({ providedIn: 'root' })
export class DebugService {
  constructor(
    private readonly startup: StartupService,
    private readonly startupStorage: StartupStorageService) {
  }

  deleteOffices(): Observable<Startup> {
    return this.startup.get$()
      .pipe(
        first(),
        map(startup => startup !),
        tap(startup => startup.offices = []),
        switchMap(startup => this.startup.update(startup)),
      );
  }

  async deleteStartup(): Promise<void> {
    return this.startupStorage.delete();
  }
}
