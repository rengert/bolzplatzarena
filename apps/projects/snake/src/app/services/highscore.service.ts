import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { GameMode } from '../app.constants';
import { Highscore } from '../models/highscore.model';
import { HighscoreStorageService } from './storage/highscore-storage.service';

@Injectable({ providedIn: 'root' })
export class HighscoreService {
  constructor(
    private readonly highscoreStorage: HighscoreStorageService,
    private readonly firestore: AngularFirestore,
  ) {
  }

  async add(highscore: Highscore): Promise<void> {
    await this.highscoreStorage.highscore.put(highscore);
    await this.firestore.collection('SnakeHighscore')
      .add(highscore);
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

  getRemote$(gameMode: GameMode): Observable<Highscore[]> {
    return this.firestore.collection<Highscore>(
      'SnakeHighscore',
      ref => ref
        .where('gameMode', '==', gameMode)
        .orderBy('score', 'desc')
        .limit(10),
    )
      .valueChanges();
  }
}
