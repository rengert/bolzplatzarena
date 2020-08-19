import { Injectable } from '@angular/core';
import { createMoment } from '@bpa/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { Startup } from '../../models/startup.model';

@Injectable({ providedIn: 'root' })
export class StartupStorageService {
  constructor(private readonly storage: StorageMap) {
  }

  launched$(): Observable<boolean> {
    return this.storage.get<Startup>('startup')
      .pipe(
        map(startup => startup !== undefined),
      );
  }

  watch$(): Observable<Startup> {
    return this.storage.watch<Startup>('startup')
      .pipe(
        map(data => data as Startup),
      );
  }

  get$(): Observable<Startup> {
    return this.storage.get<Startup>('startup')
      .pipe(
        map(data => data as Startup),
      );
  }

  save$(startup: Startup): Observable<Startup> {
    return this.storage.set('startup', startup)
      .pipe(mapTo(startup));
  }

  setMoment(key: string, value: Moment): Promise<void> {
    return this.storage.set(key, value.toISOString()).toPromise();
  }

  async getMoment(key: string): Promise<Moment | undefined> {
    const data = await this.storage.get<string>(key).toPromise() as string;
    if (!!data) {
      return createMoment(data);
    }

    return;
  }

  async delete(): Promise<undefined> {
    return this.storage.delete('startup')
      .toPromise();
  }
}
