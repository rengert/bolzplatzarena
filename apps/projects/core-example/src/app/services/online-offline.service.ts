import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OnlineOfflineService {
  readonly status$: Observable<boolean>;

  private readonly status = new BehaviorSubject(navigator.onLine);

  constructor() {
    this.status$ = this.status;

    window.addEventListener('offline', () => this.updateOnlineStatus());
    window.addEventListener('online', () => this.updateOnlineStatus());
  }

  private updateOnlineStatus(): void {
    this.status.next(navigator.onLine);
  }
}
