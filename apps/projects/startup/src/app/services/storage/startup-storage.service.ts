import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Startup } from '../../models/startup.model';

@Injectable({ providedIn: 'root' })
export class StartupStorageService {
  private readonly notify$ = new BehaviorSubject<boolean>(true);

  async launched(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        const data = localStorage.getItem('startup');
        resolve(data !== null);
      });
    });
  }

  get$(): Observable<Startup> {
    return this.notify$.pipe(
      map(_ => {
        const data = localStorage.getItem('startup');
        if (data === null) {
          throw new Error('Unknown error occured');
        }

        return JSON.parse(data) as Startup;
      }),
    );
  }

  async save(startup: Startup): Promise<Startup> {
    return new Promise<Startup>(resolve => {
      setTimeout(() => {
        const data = JSON.stringify(startup);
        localStorage.setItem('startup', data);
        this.notify$.next(true);
        resolve(startup);
      });
    });
  }

  async delete(): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        localStorage.removeItem('startup');
        this.notify$.next(false);
        resolve();
      });
    });
  }
}
