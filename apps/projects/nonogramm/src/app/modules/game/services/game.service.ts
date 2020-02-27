import { Injectable } from '@angular/core';
import { Config } from '../../../models/config';
import { GameBlock } from '../../../models/game-block';
import { GameData } from '../../../models/game-data';
import { GameRow } from '../../../models/game-row';
import { Level } from '../../../models/level';

const probilityEasy = 0.1;
const probilityMedium = 0.05;

const probility = 0.6;

function shouldBeShown(expected: boolean, config: Config): boolean {
  if (expected) {
    return false;
  }
  let result: boolean;
  switch (config.level) {
    case Level.easy:
      result = Math.random() < probilityEasy;
      break;
    case Level.medium:
      result = Math.random() < probilityMedium;
      break;
    default:
      result = false;
  }

  return result;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  createGameData(config: Config): GameData {
    const gameData: GameData = {
      failed: 0,
      data: [],
      current: [],
      config,
    };
    for (let i = 0; i < config.size; i++) {
      const row: GameRow = { row: i + 1, data: [] as GameBlock[] };
      for (let j = 0; j < config.size; j++) {
        const expected = Math.random() < probility;
        row.data.push({
          column: j + 1,
          row: i + 1,
          expected,
          show: shouldBeShown(expected, config),
        });
      }
      gameData.data.push(row);
    }
    gameData.current = [...gameData.data].map(
      row => ({
        ...row,
        data: row.data.map(block => ({ ...block })),
      }),
    );

    return gameData;
  }
}
