import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { GameData } from '../models/game-data';
import { Level } from '../models/level';
import { Size } from '../models/size';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly configStorageKey = 'config';
  private readonly gameStorageKey = 'game';

  loadConfig(): Config {
    const data = localStorage.getItem(this.configStorageKey);

    return (data === null)
      ? { size: Size.large, level: Level.easy }
      : JSON.parse(data);
  }

  saveConfig(config: Config): void {
    localStorage.setItem(
      this.configStorageKey,
      JSON.stringify(config),
    );
  }

  loadGame(): GameData | undefined {
    const data = localStorage.getItem(this.gameStorageKey);

    return (data === null)
      ? undefined
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
}
