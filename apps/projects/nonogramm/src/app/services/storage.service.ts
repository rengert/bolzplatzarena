import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { Level } from '../models/level';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly configStorageKey = 'config';

  constructor() {
  }

  saveConfig(config: Config) {
    localStorage.setItem(
      this.configStorageKey,
      JSON.stringify(config),
    );
  }

  loadConfig(): Config {
    return JSON.parse(localStorage.getItem(this.configStorageKey))
      || { size: 1, level: Level.easy };
  }
}
