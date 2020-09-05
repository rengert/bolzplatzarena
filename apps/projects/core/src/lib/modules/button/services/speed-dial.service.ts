import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Button {
  key: string;
  icon: string;
  route: string[];
}

@Injectable({ providedIn: 'root' })
export class SpeedDialService {
  private readonly update$ = new BehaviorSubject<Button[]>([]);
  private items: Button[] = [];

  items$(): Observable<Button[]> {
    return this.update$;
  }

  register(items: Button[]): void {
    this.items.push(...items);
    this.update$.next(this.items);
  }

  unregsiter(items: Button[]): void {
    this.items = [...this.items.filter(button => !items.find(item => item.key === button.key))];
    this.update$.next(this.items);
  }
}
