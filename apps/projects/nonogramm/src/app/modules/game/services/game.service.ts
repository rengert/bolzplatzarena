import { Injectable } from '@angular/core';
import { Config } from '../../../models/config';
import { GameData } from '../../../models/game-data';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor() {
  }

  createGameData(config: Config): GameData {
    const gameData = {
      data: [],
      config
    };
    for (let i = 0; i < config.size; i++) {
      const row = [] as boolean[];
      for (let j = 0; j < config.size; j++) {
        row.push(Math.random() < 0.5);
      }
      gameData.data.push(row);
    }
    return gameData;
  }


}
