import { Injectable } from '@angular/core';
import { Enemy } from '../models/enemy.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly kills = new BehaviorSubject(0);
  private readonly cash = new BehaviorSubject(1000);

  readonly kills$: Observable<number>;
  readonly cash$: Observable<number>;

  constructor() {
    this.kills$ = this.kills;
    this.cash$ = this.cash;
  }

  addKill(enemy: Enemy): void {
    this.kills.next(this.kills.value + 1);
    this.cash.next(this.cash.value + enemy.value);
  }
}
