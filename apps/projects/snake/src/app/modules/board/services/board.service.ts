import { Injectable } from '@angular/core';
import { GameMode, Level, Speed } from '../../../app.constants';
import { Settings } from '../../../components/settings/settings.component';
import { BoardSettings } from '../../../models/board-settings.model';
import { Cell } from '../../../models/cell.model';

// tslint:disable-next-line:no-null-keyword
@Injectable({ providedIn: null })
export class BoardService {
  private readonly settings: Settings;

  constructor() {
    const data = localStorage.getItem('settings');
    const defaultValue = {
      level: Level.Normal,
      gameMode: GameMode.Normal,
      user: 'Anonym',
    };
    this.settings = data === null ? defaultValue : { ...defaultValue, ...(JSON.parse(data) as Settings) };
  }

  createNewLine(line: number, settings: BoardSettings): Cell[] {
    const data: Cell[] = [];
    for (let j = 0; j < settings.width; j++) {
      data[j] = {
        id: `${line}-{j}`,
        x: line,
        y: j,
        isSnake: false,
        isHead: false,
        isApple: false,
        isGoldenApple: false,
      };
    }

    return data;
  }

  getSettings(): BoardSettings {
    return {
      interval: this.getInterval(),
      width: 16,
      height: 20,
      startDelay: 4500,
      chanceGoldenApple: 0.1,
      settings: this.settings,
    };
  }

  private getInterval(): Speed {
    switch (this.settings.level) {
      case Level.Easy:
        return Speed.Slow;
      case Level.Normal:
        return Speed.Medium;
      case Level.Hard:
        return Speed.Fast;
      case Level.Faster:
        return Speed.Fast;
      default:
        return Speed.Fast;
    }
  }
}
