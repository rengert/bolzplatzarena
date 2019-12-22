import { Injectable } from '@angular/core';
import { Config } from '../../../models/config';
import { GameData } from '../../../models/game-data';
import { GameBlock } from '../../../models/game-block';

@Injectable({ providedIn: 'root' })
export class GameService {
  createGameData(config: Config): GameData {
    const gameData = {
      failed: 0,
      data: [],
      config
    } as GameData;
    for (let i = 0; i < config.size; i++) {
      const row = [] as GameBlock[];
      for (let j = 0; j < config.size; j++) {
        row.push({
            expected: Math.random() < 0.5,
            show: false
          }
        );
      }
      gameData.data.push(row);
    }
    gameData.current = [...gameData.data].map(
      row => row.map(block => ({ ...block }))
    );
    return gameData;
  }
}
