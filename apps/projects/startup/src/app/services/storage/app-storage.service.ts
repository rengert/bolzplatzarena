import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({ providedIn: 'root' })
export class AppStorageService extends Dexie {
  constructor() {
    super('startup');

    this.version(1)
      .stores({
        worker: '&id',
      });
  }
}
