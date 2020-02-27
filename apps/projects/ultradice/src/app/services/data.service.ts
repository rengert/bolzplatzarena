import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { from, Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { Statistic } from '../models/statistic.model';

@Injectable({ providedIn: 'root' })
export class DataService extends Dexie {
  private readonly statisticTableName = 'statistic';
  private readonly playerTableName = 'player';

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
          if (item) {
            await this.table<Statistic>(this.statisticTableName)
              .update(item.id, { value: item.value + 1 });
          } else {
            await this.table(this.statisticTableName)
              .add({ name: key, value: 1 });
          }
        },
      );
  }

  async updateMax(key: string, value: number): Promise<void> {
    return this.table<Statistic>(this.statisticTableName)
      .filter(item => item.name === key)
      .first()
      .then(async item => {
        if (item) {
          if (item.value < value) {
            await this.table<Statistic>(this.statisticTableName)
              .update(item.id, { value });
          }
        } else {
          await this.table(this.statisticTableName)
            .add({ name: key, value });
        }
      });
  }

  async updateMin(key: string, value: number): Promise<void> {
    return this.table<Statistic>(this.statisticTableName)
      .filter(item => item.name === key)
      .first()
      .then(async item => {
        if (item) {
          if (item.value > value) {
            await this.table<Statistic>(this.statisticTableName)
              .update(item.id, { value });
          }
        } else {
          await this.table(this.statisticTableName)
            .add({ name: key, value });
        }
      });
  }

  getStatistics$(): Observable<Statistic[]> {
    return from(this.table<Statistic>(this.statisticTableName)
      .orderBy('name')
      .toArray());
  }

  async updatePlayers(playersList: Player[]): Promise<any> {
    return this.table<Player>(this.playerTableName)
      .bulkPut(playersList);
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
