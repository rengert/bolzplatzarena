import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameMode, Level } from '../../app.constants';

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
  readonly level = Level;

  user = '';
  selectedLevel: Level;
  gameMode: GameMode;
  readonly levels: { key: string; value: Level; }[];
  readonly modes: { key: string; value: GameMode; }[];

  constructor(private readonly router: Router) {
    this.levels = [
      { key: 'EASY', value: Level.easy },
      { key: 'NORMAL', value: Level.normal },
      { key: 'HARD', value: Level.hard },
      { key: 'FASTER', value: Level.faster },
    ];

    this.modes = [
      { key: 'NORMAL', value: GameMode.normal },
      { key: 'NO_WALLS', value: GameMode.noWalls },
      { key: 'GOLDEN_APPLE', value: GameMode.goldenApple },
    ];
  }

  async save(): Promise<void> {
    const settings: Settings = {
      level: this.selectedLevel,
      gameMode: this.gameMode,
      user: this.user,
    };
    localStorage.setItem('settings', JSON.stringify(settings));

    await this.router.navigate(['snake']);
  }
}
