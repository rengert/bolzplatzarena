import { Injectable } from '@angular/core';
import { Credit } from '../models/credit.model';

@Injectable({ providedIn: 'root' })
export class CreditService {
  constructor() {
  }

  list(): Credit[] {
    return [];
  }

  repay(credit: Credit, value: number): void {
  }

  borrow(credit: Credit, value: number): void {
  }
}
