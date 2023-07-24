import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { GameMode } from '../app.constants';
import { Highscore } from '../models/highscore.model';
import { HighscoreStorageService } from './storage/highscore-storage.service';

@Injectable({ providedIn: 'root' })
export class HighscoreService {
  constructor(private readonly highscoreStorage: HighscoreStorageService) {
  }

  add(highscore: Highscore): Promise<unknown> {
    if (!highscore.name) {
      return Promise.resolve()
    }
    return this.highscoreStorage.highscore.put(highscore);
  }

  get$(): Observable<Highscore[]> {
    return from(
      this.highscoreStorage.highscore
        .orderBy('score')
        .reverse()
        .limit(10)
        .toArray(),
    );
  }

  getByMode$(gameMode: GameMode): Observable<Highscore[]> {
    return from(
      this.highscoreStorage.highscore
        .orderBy('score')
        .filter(item => item.gameMode === gameMode)
        .reverse()
        .limit(10)
        .toArray(),
    );
  }
}
