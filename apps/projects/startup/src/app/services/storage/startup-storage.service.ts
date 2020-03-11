import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
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

  get$(): Observable<Startup> {
    return this.storage.watch<Startup>('startup')
      .pipe(
        map(data => data as Startup),
      );
  }

  save$(startup: Startup): Observable<Startup> {
    return this.storage.set('startup', startup)
      .pipe(
        mapTo(startup),
      );
  }

  async delete(): Promise<undefined> {
    return this.storage.delete('startup')
      .toPromise();
  }
}
