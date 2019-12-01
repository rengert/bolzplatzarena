import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Statistic } from '../models/statistic.model';
import { Player } from '../models/player.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static db: Dexie;
  private static STATISTIC_TABLE_NAME = 'statistic';
  private static PLAYER_TABLE_NAME = 'player';
  private static GAME_TABLE_NAME = 'game';

  public static init(): void {
    DataService.db = new Dexie('MyDatabase');
    DataService.db.version(1).stores({
      statistic: '++id, name, value',
      player: '++id',
    });
    DataService.db.version(2).stores({
      statistic: '++id, name, value',
      player: '++id',
    });
    DataService.db.version(3).stores({
      statistic: '++id, name, value',
      player: '++id',
      game: '++id',
    });
  }

  static initValue(stat: string) {
    DataService.db.table<Statistic>(DataService.STATISTIC_TABLE_NAME).filter((item) => item.name === stat).first()
    .then(item => {
      if (typeof(item) === 'undefined') {
        DataService.db.table(DataService.STATISTIC_TABLE_NAME).add({ name: stat, value: 0});
      }
    });
  }

  updateShuffleStatistic(key: string) {
    return DataService.db.table<Statistic>(DataService.STATISTIC_TABLE_NAME).filter((item) => item.name === key).first()
    .then((item) => {
        if (typeof(item) === 'undefined') {
          DataService.db.table(DataService.STATISTIC_TABLE_NAME).add({ name: key, value: 1});
        } else {
          DataService.db.table<Statistic>(DataService.STATISTIC_TABLE_NAME).update(item.id, { value: item.value + 1 });
        }
    });
  }

  async updateMax(key: string, value: number) {
    return await DataService.db.table<Statistic>(DataService.STATISTIC_TABLE_NAME).filter((item) => item.name === key).first()
    .then((item) => {
        if (typeof(item) === 'undefined') {
          DataService.db.table(DataService.STATISTIC_TABLE_NAME).add({ name: key, value});
        } else if (item.value < value) {
          DataService.db.table<Statistic>(DataService.STATISTIC_TABLE_NAME).update(item.id, { value });
        }
    });
  }

  async updateMin(key: string, value: number) {
    return await DataService.db.table<Statistic>(DataService.STATISTIC_TABLE_NAME).filter((item) => item.name === key).first()
    .then((item) => {
        if (typeof(item) === 'undefined') {
          DataService.db.table(DataService.STATISTIC_TABLE_NAME).add({ name: key, value});
        } else if (item.value > value) {
          DataService.db.table<Statistic>(DataService.STATISTIC_TABLE_NAME).update(item.id, { value });
        }
    });
  }

  getStatistics(): Promise<Statistic[]> {
    return DataService.db.table<Statistic>(DataService.STATISTIC_TABLE_NAME).orderBy('name').toArray();
  }

  getGame(): Observable<Game> {
    return from(DataService.db.table<Game>(DataService.GAME_TABLE_NAME).filter((item) => true).first());
  }

  updatePlayers(playersList: Player[]) {
    return DataService.db.table<Player>(DataService.PLAYER_TABLE_NAME).bulkPut(playersList);
  }

  createGame(game: Game): Observable<any> {
    return from<any>(DataService.db.table<Game>(DataService.GAME_TABLE_NAME).clear().then(
      () => DataService.db.table<Game>(DataService.GAME_TABLE_NAME).put(game)
    ));
  }

  updateGame(game: Game): any {
    return DataService.db.table<Game>(DataService.GAME_TABLE_NAME).put(game);
  }

  cleanUpGame(): Observable<any> {
    return from(DataService.db.table<Game>(DataService.GAME_TABLE_NAME).clear());
  }

  async cleanUp() {
    await DataService.db.table<Player>(DataService.PLAYER_TABLE_NAME).clear();
    await DataService.db.table<Player>(DataService.STATISTIC_TABLE_NAME).clear();
    return;
  }

  async updateData(playersList: Player[]): Promise<any> {
    try {
      await DataService.db.table<Player>(DataService.PLAYER_TABLE_NAME).clear();
    } catch {}
    return DataService.db.table<Player>(DataService.PLAYER_TABLE_NAME).bulkAdd(playersList);
  }

  constructor() { }
}
