import { Caption } from '../../../models/caption';
import { GameData } from '../../../models/game-data';

export function generateRowHints(gameData: GameData): Caption[][] {
  return generateHints(gameData, true);
}

export function generateColumnHints(gameData: GameData): Caption[][] {
  return generateHints(gameData, false);
}

function generateHints(gameData: GameData, isRow: boolean): Caption[][] {
  const result = [];
  for (let i = 0; i < gameData.config.size; i++) {
    const row = [] as Caption[];
    let count = 0;
    let done = true;
    for (let j = 0; j < gameData.config.size; j++) {
      const item = isRow ? gameData.current[i][j] : gameData.current[j][i];
      done = done && item.show;
      if (!item.expected) {
        if (count > 0) {
          row.push({ items: count, done });
        }
        count = 0;
      } else {
        count++;
      }
    }
    if (count > 0) {
      row.push({ items: count, done });
    }
    result.push(row);
  }
  return result;
}
