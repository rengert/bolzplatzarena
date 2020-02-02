import { Injectable } from '@angular/core';
import { Config } from '../../../models/config';
import { GameBlock } from '../../../models/game-block';
import { GameData } from '../../../models/game-data';
import { Level } from '../../../models/level';

function shouldBeShown(expected: boolean, config: Config): boolean {
  if (expected) {
    return false;
  }
  switch (config.level) {
    case Level.easy:
      return Math.random() < 0.1;
    case Level.medium:
      return Math.random() < 0.05;
    default:
      return false;
  }
}

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
        const expected = Math.random() < 0.6;
        row.push({
            expected,
            show: shouldBeShown(expected, config)
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
