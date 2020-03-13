import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Worker } from '../../models/worker.model';

@Injectable({ providedIn: 'root' })
export class AppStorageService extends Dexie {
  workers: Dexie.Table<Worker, string>;

  constructor() {
    super('startup');

    this.version(1)
      .stores({
        workers: '&id',
      });

    this.workers.mapToClass(Worker);
  }
}
