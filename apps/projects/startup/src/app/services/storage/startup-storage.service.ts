import { Injectable } from '@angular/core';

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
}
