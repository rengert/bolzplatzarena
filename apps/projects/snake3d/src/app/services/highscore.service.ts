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
    if (!highscore.name) {
      return;
    }
    await this.highscoreStorage.highscore.put(highscore);
    await this.firestore.collection('Highscore')
      .add(highscore);
  }

  get$(): Observable<Highscore[]> {
    return from(
      this.highscoreStorage.highscore
        .orderBy('score')
        .reverse()
        .limit(3)
        .toArray(),
    );
  }

  getByMode$(gameMode: GameMode): Observable<Highscore[]> {
    return from(
      this.highscoreStorage.highscore
        .orderBy('score')
        .filter(item => item.gameMode === gameMode)
        .reverse()
        .limit(3)
        .toArray(),
    );
  }

  getRemote$(gameMode: GameMode): Observable<Highscore[]> {
    return this.firestore.collection<Highscore>(
      'Highscore',
      ref => ref
        .where('gameMode', '==', gameMode)
        .orderBy('score', 'desc')
        .limit(3),
    )
      .valueChanges();
  }
}
