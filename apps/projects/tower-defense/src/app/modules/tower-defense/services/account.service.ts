import { Injectable, NgZone } from '@angular/core';
import { Enemy } from '../models/enemy.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly kills = new BehaviorSubject(0);
  private readonly cash = new BehaviorSubject(1000);

  readonly kills$: Observable<number>;
  readonly cash$: Observable<number>;

  constructor(
    private snackBar: MatSnackBar,
    private readonly ngZone: NgZone) {
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
    if (this.cash.value >= amount) {
      this.ngZone.run(() => {
        this.cash.next(this.cash.value - amount);
      });
      return true;
    }

    this.snackBar.open('Leider nicht genügend Kohle, General!!', undefined, { duration: 1500 });

    return false;
  }
}
