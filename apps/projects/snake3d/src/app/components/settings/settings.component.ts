import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameMode, Level } from '../../../../../snake/src/app/app.constants';

export interface Settings {
  level: Level;
  gameMode: GameMode;
  user: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  readonly Level = Level;

  user = '';
  level: Level;
  gameMode: GameMode;
  readonly levels: { key: string, value: Level }[];
  readonly modes: { key: string, value: GameMode }[];

  constructor(private readonly router: Router) {
    this.levels = [
      { key: 'EASY', value: Level.Easy },
      { key: 'NORMAL', value: Level.Normal },
      { key: 'HARD', value: Level.Hard },
    ];

    this.modes = [
      { key: 'NORMAL', value: GameMode.Normal },
      { key: 'NO_WALLS', value: GameMode.NoWalls },
      { key: 'GOLDEN_APPLE', value: GameMode.GoldenApple },
    ];
  }

  async save(): Promise<void> {
    const settings: Settings = {
      level: this.level,
      gameMode: this.gameMode,
      user: this.user,
    };
    localStorage.setItem('settings', JSON.stringify(settings));

    await this.router.navigate(['snake']);
  }
}
