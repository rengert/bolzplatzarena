import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { orderBy } from 'lodash';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface Audit {
  value: number;
  reason: string;
  date: number;
}

@Injectable({ providedIn: 'root' })
export class CreditStorageService {
  constructor(private readonly storage: StorageMap) {
  }

  async addAudit(value: number, reason: string): Promise<void> {
    const data = (await this.storage.get<Audit[]>('credit-audit').toPromise() ?? []) as Audit[];
    data.push({
      value,
      reason,
      date: new Date().valueOf(),
    });
    await this.storage.set('credit-audit', data).toPromise();
  }

  watchAudit$(): Observable<Audit[]> {
    return this.storage.watch<Audit[]>('credit-audit').pipe(
      filter(data => !!data),
      map(data => orderBy((data as Audit[]), item => [item.date], ['desc'])),
    );
  }
}
