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
    let index = 0;
    for (let j = 0; j < gameData.config.size; j++) {
      const item = isRow ? gameData.current[i].data[j] : gameData.current[j].data[i];
      done = done && item.show;
      if (item.expected) {
        count++;
      } else {
        if (count > 0) {
          row.push({ row: i + 1, index: index += 1, items: count, done });
        }
        count = 0;
      }
    }
    if (count > 0) {
      row.push({ row: i + 1, index: index += 1, items: count, done });
    }
    result.push(row);
  }

  return result;
}
