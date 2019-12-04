import Dexie from 'dexie';
import { from, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { Statistic } from '../models/statistic.model';

@Injectable({ providedIn: 'root' })
export class DataService extends Dexie {
  private readonly statisticTableName = 'statistic';
  private readonly playerTableName = 'player';
  private readonly gameTableName = 'game';

  constructor() {
    super('ultradice');

    this.version(1).stores({
      statistic: '++id, name, value',
      player: '++id',
    });
    this.version(2).stores({
      statistic: '++id, name, value',
      player: '++id',
    });
    this.version(3).stores({
      statistic: '++id, name, value',
      player: '++id',
      game: '++id',
    });
  }

  initValue(stat: string) {
    this.table<Statistic>(this.statisticTableName).filter((item) => item.name === stat).first()
      .then(item => {
        if (!item) {
          this.table(this.statisticTableName).add({ name: stat, value: 0 });
        }
      });
  }

  updateShuffleStatistic(key: string): Promise<void> {
    return this.table<Statistic>(this.statisticTableName).filter((item) => item.name === key).first()
      .then((item) => {
        if (!item) {
          this.table(this.statisticTableName).add({ name: key, value: 1 });
        } else {
          this.table<Statistic>(this.statisticTableName).update(item.id, { value: item.value + 1 });
        }
      }
      );
  }

  updateMax(key: string, value: number): Promise<void> {
    return this.table<Statistic>(this.statisticTableName).filter((item) => item.name === key).first()
      .then((item) => {
        if (!item) {
          this.table(this.statisticTableName).add({ name: key, value });
        } else if (item.value < value) {
          this.table<Statistic>(this.statisticTableName).update(item.id, { value });
        }
      });
  }

  updateMin(key: string, value: number): Promise<void> {
    return this.table<Statistic>(this.statisticTableName).filter((item) => item.name === key).first()
      .then((item) => {
        if (!item) {
          this.table(this.statisticTableName).add({ name: key, value });
        } else if (item.value > value) {
          this.table<Statistic>(this.statisticTableName).update(item.id, { value });
        }
      });
  }

  getStatistics(): Promise<Statistic[]> {
    return this.table<Statistic>(this.statisticTableName).orderBy('name').toArray();
  }

  getGame(): Observable<Game> {
    return from(this.table<Game>(this.gameTableName).filter((item) => true).first());
  }

  updatePlayers(playersList: Player[]): Promise<any> {
    return this.table<Player>(this.playerTableName).bulkPut(playersList);
  }

  createGame(game: Game): Observable<any> {
    return from<any>(this.table<Game>(this.gameTableName).clear().then(
      () => this.table<Game>(this.gameTableName).put(game)
    ));
  }

  updateGame(game: Game): Promise<any> {
    return this.table<Game>(this.gameTableName).put(game);
  }

  cleanUpGame(): Promise<void> {
    return this.table<Game>(this.gameTableName).clear();
  }

  async cleanUp() {
    await this.table<Player>(this.playerTableName).clear();
    await this.table<Player>(this.statisticTableName).clear();
  }

  async updateData(playersList: Player[]): Promise<any> {
    try {
      await this.table<Player>(this.playerTableName).clear();
    } catch {
    }
    return this.table<Player>(this.playerTableName).bulkAdd(playersList);
  }
}
