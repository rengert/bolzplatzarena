import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { GameData } from '../models/game-data';
import { Level } from '../models/level';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly configStorageKey = 'config';
  private readonly gameStorageKey = 'game';

  saveConfig(config: Config) {
    localStorage.setItem(
      this.configStorageKey,
      JSON.stringify(config),
    );
  }

  loadConfig(): Config {
    return JSON.parse(localStorage.getItem(this.configStorageKey))
      || { size: 15, level: Level.easy };
  }

  saveGame(game: GameData) {
    localStorage.setItem(
      this.gameStorageKey,
      JSON.stringify(game),
    );
  }

  cleanGame() {
    localStorage.removeItem(this.gameStorageKey);
  }

  loadGame(): GameData | undefined {
    const data = localStorage.getItem(this.gameStorageKey);
    if (data) {
      return JSON.parse(data);
    }
    return undefined;
  }
}
