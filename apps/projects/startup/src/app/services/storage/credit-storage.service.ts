import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

export interface Audit {
  value: number;
  reason: string;
  date: number;
}

@Injectable({ providedIn: 'root' })
export class CreditStorageService {
  constructor(private readonly storage: StorageService) {
  }

  async addAudit(value: number, reason: string, date: Moment): Promise<void> {
    const data = (await this.storage.get<Audit[]>('credit-audit').toPromise() ?? []) as Audit[];
    data.push({
      value,
      reason,
      date: date.valueOf(),
    });
    await this.storage.set('credit-audit', data).toPromise();
  }

  watchAudit$(count: number): Observable<Audit[]> {
    return this.storage.watch$<Audit>('credit-audit', item => [item.date], ['desc'], count);
  }
}
