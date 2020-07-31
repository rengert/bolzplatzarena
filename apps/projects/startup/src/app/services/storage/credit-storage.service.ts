import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

interface Audit {
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
}
