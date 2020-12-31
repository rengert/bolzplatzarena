import { Injectable, NgZone } from '@angular/core';
import { Enemy } from '../models/enemy.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly kills = new BehaviorSubject(0);
  private readonly cash = new BehaviorSubject(1000);

  readonly kills$: Observable<number>;
  readonly cash$: Observable<number>;

  constructor(private readonly ngZone: NgZone) {
    this.kills$ = this.kills;
    this.cash$ = this.cash;
  }

  addKill(enemy: Enemy): void {
    this.ngZone.run(() => {
      this.kills.next(this.kills.value + 1);
      this.cash.next(this.cash.value + enemy.value);
    });
  }

  pay(amount: number): boolean {
    if (this.cash.value > amount) {
      this.ngZone.run(() => {
        this.cash.next(this.cash.value - amount);
      });
      return true;
    }
    return false;
  }
}
