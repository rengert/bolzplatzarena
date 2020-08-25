import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { Office } from '../../../models/office.model';
import { Startup } from '../../../models/startup.model';
import { StartupService } from '../../../services/startup.service';

@Injectable({ providedIn: 'root' })
export class OfficeService {
  constructor(private readonly startup: StartupService) {
  }

  async get$(): Promise<Office[]> {
    return this.startup.get$().then(startup => startup.offices);
  }

  watch$(): Observable<Office[]> {
    return this.startup.watch$()
      .pipe(
        map(startup => startup.offices),
      );
  }

  open(office: Office): Observable<Startup> {
    return this.startup.watch$()
      .pipe(
        first(),
        tap(startup => startup.offices.push(office)),
        switchMap(startup => this.startup.update(startup)),
      );
  }
}
