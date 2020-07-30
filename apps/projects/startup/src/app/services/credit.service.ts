import { Injectable } from '@angular/core';
import { StartupService } from './startup.service';

@Injectable({ providedIn: 'root' })
export class CreditService {
  constructor(private readonly startup: StartupService) {
  }

  async change(value: number): Promise<void> {
    const startUp = await this.startup.get$();
    startUp.credit += value;
    await this.startup.update(startUp)
      .toPromise();
  }
}
