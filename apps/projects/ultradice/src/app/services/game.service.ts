import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly state$ = new BehaviorSubject(false);

  async createGame(game: Game): Promise<Game> {
    await this.cleanUpGame();

    return this.updateGame(game);
  }

  exists(): boolean {
    return !localStorage.getItem('game');
  }

  getGame(): Observable<Game> {
    const data = localStorage.getItem('game');

    if (!data) {
      throw new Error('Game not loaded');
    }

    return of(JSON.parse(data) as Game);
  }

  async updateGame(game: Game): Promise<Game> {
    return new Promise<Game>((resolve, __) => {
      localStorage.setItem('game', JSON.stringify(game));
      resolve(game);
    });
  }

  async cleanUpGame(): Promise<void> {
    return new Promise<void>((resolve, __) => {
      localStorage.removeItem('game');
      resolve();
    });
  }
}
