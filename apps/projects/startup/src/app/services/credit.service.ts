import { Injectable } from '@angular/core';
import { StartupService } from './startup.service';
import { CreditStorageService } from './storage/credit-storage.service';

@Injectable({ providedIn: 'root' })
export class CreditService {
  constructor(
    private readonly startup: StartupService,
    private readonly creditStorage: CreditStorageService,
  ) {
  }

  async change(value: number, reason?: string): Promise<void> {
    const startUp = await this.startup.get$();
    startUp.credit += value;
    await this.startup.update(startUp)
      .toPromise();

    if (reason) {
      await this.audit(value, reason);
    }
  }

  async audit(value: number, reason: string): Promise<void> {
    await this.creditStorage.addAudit(value, reason);
  }
}
