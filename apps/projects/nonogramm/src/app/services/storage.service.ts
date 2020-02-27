import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { GameData } from '../models/game-data';
import { Level } from '../models/level';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly configStorageKey = 'config';
  private readonly gameStorageKey = 'game';

  saveConfig(config: Config): void {
    localStorage.setItem(
      this.configStorageKey,
      JSON.stringify(config),
    );
  }

  loadConfig(): Config {
    const data = localStorage.getItem(this.configStorageKey);

    return data === null
      ? { size: 15, level: Level.easy }
      : JSON.parse(data);
  }

  saveGame(game: GameData): void {
    localStorage.setItem(
      this.gameStorageKey,
      JSON.stringify(game),
    );
  }

  cleanGame(): void {
    localStorage.removeItem(this.gameStorageKey);
  }

  loadGame(): GameData | undefined {
    const data = localStorage.getItem(this.gameStorageKey);
    if (data !== null) {
      return JSON.parse(data);
    }

    return undefined;
  }
}
