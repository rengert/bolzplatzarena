import { Injectable } from '@angular/core';
import { createMoment } from '@bpa/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Startup } from '../../models/startup.model';

@Injectable({ providedIn: 'root' })
export class StartupStorageService {
  constructor(private readonly storage: StorageMap) {
  }

  launched$(): Observable<boolean> {
    return this.storage.watch('startup').pipe(
      map(startup => !!startup),
    );
  }

  watch$(): Observable<Startup> {
    return this.storage.watch('startup').pipe(
      map(data => data as Startup),
    );
  }

  async get(): Promise<Startup> {
    return this.storage.get('startup').pipe(
      first(),
      map(data => data as Startup),
    ).toPromise();
  }

  async save(startup: Startup): Promise<void> {
    return this.storage.set('startup', startup).toPromise();
  }

  async setMoment(key: string, value: Moment): Promise<void> {
    await this.storage.set(key, value.toISOString()).toPromise();
  }

  async getMoment(key: string): Promise<Moment | undefined> {
    const data = await this.storage.get(key).toPromise() as string;
    if (!!data) {
      return createMoment(data);
    }

    return undefined;
  }

  async delete(): Promise<undefined> {
    return this.storage.delete('startup').toPromise();
  }
}
