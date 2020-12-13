import { Injectable } from '@angular/core';
import { Credit } from '../models/credit.model';
import { Observable, of } from 'rxjs';
import { StorageService } from '../../../services/storage/storage.service';
import { createUuid } from '@bpa/core';
import { MoneyService } from '../../../services/money.service';

export const CREDITS_STORAGE_KEY = 'credits';
export const CREDITS_MAX_INTEREST_RATE = 0.0125;

enum Duration {
  month = 1,
  year = 12,
}

@Injectable({ providedIn: 'root' })
export class CreditService {
  constructor(
    private readonly money: MoneyService,
    private readonly storage: StorageService,
  ) {
  }

  list$(): Observable<Credit[]> {
    return this.storage.watch$<Credit>(CREDITS_STORAGE_KEY, credit => credit.originalAmount);
  }

  generate$(): Observable<Credit[]> {
    const result: Credit[] = [];
    for (let i = 0; i < Math.random() * 5; i++) {
      const originalAmount = Math.ceil(100 * Math.random()) * 1000;
      const interestRate = Math.random() * CREDITS_MAX_INTEREST_RATE;
      const months = Math.ceil(Math.random() * 2) * Duration.year;
      const amount = Math.ceil(originalAmount * Math.pow(1 + interestRate, months));
      result.push(
        {
          id: createUuid(),
          name: 'Ergo Bank',
          amount,
          costPerMonth: Math.ceil(amount / months),
          interestRate,
          months,
          originalAmount,
        },
      );
    }

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
    await this.money.substract(value, 'Kreditrückzahlung');
    await this.storage.setEntity(CREDITS_STORAGE_KEY, credits);
  }

  async borrow(credit: Credit): Promise<void> {
    const credits = await this.storage.getEntity<Credit[]>(CREDITS_STORAGE_KEY) ?? [];
    credits.push(credit);
    await this.storage.setEntity(CREDITS_STORAGE_KEY, credits);
    await this.money.add(credit.originalAmount, 'Kreditaufnahmen');
  }
}
