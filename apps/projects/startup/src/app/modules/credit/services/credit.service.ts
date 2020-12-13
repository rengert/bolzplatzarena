import { Injectable } from '@angular/core';
import { Credit } from '../models/credit.model';
import { Observable, of } from 'rxjs';
import { StorageService } from '../../../services/storage/storage.service';
import { createUuid } from '@bpa/core';

export const CREDITS_STORAGE_KEY = 'credits';

@Injectable({ providedIn: 'root' })
export class CreditService {
  constructor(private readonly storage: StorageService) {
  }

  list$(): Observable<Credit[]> {
    return this.storage.watch$<Credit>(CREDITS_STORAGE_KEY, credit => credit.originalAmount);
  }

  generate$(): Observable<Credit[]> {
    const result: Credit[] = [{
      id: createUuid(),
      name: 'Ergo Bank',
      amount: 100000,
      costPerMonth: 10000,
      interestRate: 0.0125,
      months: 12,
      originalAmount: 100000,
    }];
    return of(result);
  }

  async repay(credit: Credit, value: number): Promise<void> {
    let credits = await this.storage.getEntity<Credit[]>(CREDITS_STORAGE_KEY) ?? [];
    const creditToUpdate = credits.find(({ id }) => id === credit.id);
    if (!creditToUpdate) {
      return;
    }

    credit.amount -= value;
    if (credit.amount <= 0) {
      credits = credits.filter(({ id }) => id !== credit.id);
    }
    await this.storage.setEntity(CREDITS_STORAGE_KEY, credits);
  }

  async borrow(credit: Credit): Promise<void> {
    const credits = await this.storage.getEntity<Credit[]>(CREDITS_STORAGE_KEY) ?? [];
    credits.push(credit);
    await this.storage.setEntity(CREDITS_STORAGE_KEY, credits);
  }
}
