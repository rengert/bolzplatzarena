import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Office } from '../../../models/office.model';
import { StartupService } from '../../../services/startup.service';

@Injectable({ providedIn: 'root' })
export class OfficeService {
  constructor(private readonly startup: StartupService) {
  }

  async get(): Promise<Office[]> {
    return this.startup.get().then(startup => startup.offices);
  }

  watch$(): Observable<Office[]> {
    return this.startup.watch$().pipe(
      map(startup => startup.offices),
    );
  }

  async open(office: Office): Promise<void> {
    const startup = await this.startup.get();
    startup.offices.push(office);
    await this.startup.update(startup);
  }
}
