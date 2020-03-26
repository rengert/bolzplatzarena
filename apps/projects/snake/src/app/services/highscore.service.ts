import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
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
        .toArray(),
    );
  }

  getRemote$(): Observable<Highscore[]> {
    return this.firestore.collection<Highscore>('SnakeHighscore', ref => ref.orderBy('score', 'desc'))
      .valueChanges();
  }
}
