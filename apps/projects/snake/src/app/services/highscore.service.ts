import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Highscore } from '../models/highscore.model';
import { HighscoreStorageService } from './storage/highscore-storage.service';

@Injectable({ providedIn: 'root' })
export class HighscoreService {
  constructor(private readonly highscoreStorage: HighscoreStorageService) {
  }

  async add(highscore: Highscore): Promise<string> {
    return this.highscoreStorage.highscore.put(highscore);
  }

  get$(): Observable<Highscore[]> {
    return from(
      this.highscoreStorage.highscore
        .orderBy('score')
        .reverse()
        .toArray(),
    );
  }
}
