import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { from, Observable } from 'rxjs';

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

    this.version(1)
      .stores({
        statistic: '++id, name, value',
        player: '++id',
      });
    this.version(2)
      .stores({
        statistic: '++id, name, value',
        player: '++id',
      });
    this.version(3)
      .stores({
        statistic: '++id, name, value',
        player: '++id',
        game: '++id',
      });
  }

  async initValue(stat: string): Promise<void> {
    await this.table<Statistic>(this.statisticTableName)
      .filter(item => item.name === stat)
      .first()
      .then(async item => {
        if (!item) {
          await this.table(this.statisticTableName)
            .add({ name: stat, value: 0 });
        }
      });
  }

  async updateShuffleStatistic(key: string): Promise<void> {
    return this.table<Statistic>(this.statisticTableName)
      .filter(item => item.name === key)
      .first()
      .then(async item => {
          if (!item) {
            await this.table(this.statisticTableName)
              .add({ name: key, value: 1 });
          } else {
            await this.table<Statistic>(this.statisticTableName)
              .update(item.id, { value: item.value + 1 });
          }
        },
      );
  }

  async updateMax(key: string, value: number): Promise<void> {
    return this.table<Statistic>(this.statisticTableName)
      .filter(item => item.name === key)
      .first()
      .then(async item => {
        if (!item) {
          await this.table(this.statisticTableName)
            .add({ name: key, value });
        } else if (item.value < value) {
          await this.table<Statistic>(this.statisticTableName)
            .update(item.id, { value });
        }
      });
  }

  async updateMin(key: string, value: number): Promise<void> {
    return this.table<Statistic>(this.statisticTableName)
      .filter(item => item.name === key)
      .first()
      .then(async item => {
        if (!item) {
          await this.table(this.statisticTableName)
            .add({ name: key, value });
        } else if (item.value > value) {
          await this.table<Statistic>(this.statisticTableName)
            .update(item.id, { value });
        }
      });
  }

  async getStatistics(): Promise<Statistic[]> {
    return this.table<Statistic>(this.statisticTableName)
      .orderBy('name')
      .toArray();
  }

  getGame(): Observable<Game> {
    return from(this.table<Game>(this.gameTableName)
      .filter(item => true)
      .first());
  }

  async updatePlayers(playersList: Player[]): Promise<any> {
    return this.table<Player>(this.playerTableName)
      .bulkPut(playersList);
  }

  createGame(game: Game): Observable<any> {
    return from<any>(this.table<Game>(this.gameTableName)
      .clear()
      .then(
        () => this.table<Game>(this.gameTableName)
          .put(game),
      ));
  }

  async updateGame(game: Game): Promise<any> {
    return this.table<Game>(this.gameTableName)
      .put(game);
  }

  async cleanUpGame(): Promise<void> {
    return this.table<Game>(this.gameTableName)
      .clear();
  }

  async cleanUp(): Promise<void> {
    await this.table<Player>(this.playerTableName)
      .clear();
    await this.table<Player>(this.statisticTableName)
      .clear();
  }

  async updateData(playersList: Player[]): Promise<any> {
    try {
      await this.table<Player>(this.playerTableName)
        .clear();
    } catch {
      //
    }

    return this.table<Player>(this.playerTableName)
      .bulkAdd(playersList);
  }
}
