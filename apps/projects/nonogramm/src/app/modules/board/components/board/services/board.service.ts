import { Injectable } from '@angular/core';
import { GameData } from '../../../../../models/game-data';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() {
  }

  generateRowHints(gameData: GameData): number[][] {
    return this.generateHints(gameData, true);
  }

  generateColumnHints(gameData: GameData): number[][] {
    return this.generateHints(gameData, false);
  }

  private generateHints(gameData: GameData, isRow: boolean): number[][] {
    const result = [];
    for (let i = 0; i < gameData.config.size; i++) {
      let row = [] as number[];
      let count = 0;
      for (let j = 0; j < gameData.config.size; j++) {
        const expected = isRow ? gameData.data[i][j] : gameData.data[j][i];
        if (!expected) {
          if (count > 0) {
            row.push(count);
          }
          count = 0;
        } else {
          count++;
        }
      }
      if (count > 0) {
        row.push(count);
      }
      if (!isRow) {
        row = row.reverse();
      }
      result.push(row);
    }
    return result;
  }
}
