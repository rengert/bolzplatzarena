import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Worker } from '../../../../../startup/src/app/models/worker.model';
import { Highscore } from '../../models/highscore.model';

@Injectable({ providedIn: 'root' })
export class HighscoreStorageService extends Dexie {
  highscore: Dexie.Table<Highscore, string>;

  constructor() {
    super('highscore');

    this.version(1)
      .stores({
        highscore: '&id, score',
      });

    this.highscore.mapToClass(Worker);
  }
}
