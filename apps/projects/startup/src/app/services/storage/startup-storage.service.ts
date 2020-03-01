import { Injectable } from '@angular/core';
import { Startup } from '../../models/startup.model';

@Injectable({ providedIn: 'root' })
export class StartupStorageService {
  async launched(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        const data = localStorage.getItem('startup');
        resolve(data !== null);
      });
    });
  }

  async save(startup: Startup): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        const data = JSON.stringify(startup);
        localStorage.setItem('startup', data);
        resolve(true);
      });
    });
  }
}
