import { Injectable, NgZone } from '@angular/core';
import { Enemy } from '../models/enemy.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isZero } from '@bpa/core';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly energy = new BehaviorSubject(1);
  private readonly kills = new BehaviorSubject(0);
  private readonly cash = new BehaviorSubject(1000);

  readonly energy$: Observable<number>;
  readonly kills$: Observable<number>;
  readonly cash$: Observable<number>;

  constructor(
    private snackBar: MatSnackBar,
    private readonly ngZone: NgZone) {
    this.kills$ = this.kills;
    this.cash$ = this.cash;
    this.energy$ = this.energy;
  }

  get defeated(): boolean {
    return isZero(this.energy.value);
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

  hit(): void {
    console.log(this.energy.value);
    if (!this.defeated) {
      this.ngZone.run(() => {
        this.energy.next(this.energy.value - 0.1);
      });
    }
  }
}
