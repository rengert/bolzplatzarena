import { Injectable } from '@angular/core';
import { Credit } from '../models/credit.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CreditService {
  constructor() {
  }

  list$(): Observable<Credit[]> {
    return of([]);
  }

  generate$(): Observable<Credit[]> {
    const result: Credit[] = [{
      name: 'Ergo Bank',
      amount: 100000,
      costPerMonth: 10000,
      interestRate: 0.0125,
      months: 12,
      originalAmount: 100000,
    }];
    return of(result);
  }

  repay(credit: Credit, value: number): void {
  }

  borrow(credit: Credit, value: number): void {
  }
}
