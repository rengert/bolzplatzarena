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
  user: string = '';
  selectedLevel: Level;
  gameMode: GameMode;

  readonly level = Level;
  readonly levels = [
    { key: 'EASY', value: Level.easy },
    { key: 'NORMAL', value: Level.normal },
    { key: 'HARD', value: Level.hard },
    { key: 'FASTER', value: Level.faster },
  ];
  readonly modes = [
    { key: 'NORMAL', value: GameMode.normal },
    { key: 'NO_WALLS', value: GameMode.noWalls },
    { key: 'GOLDEN_APPLE', value: GameMode.goldenApple },
  ];

  constructor(private readonly router: Router) {
    const data = localStorage.getItem('settings');
    const defaultValue = {
      level: Level.normal,
      gameMode: GameMode.normal,
      user: '',
    };
    const { level, gameMode, user } = data
      ? { ...defaultValue, ...(JSON.parse(data) as Settings) }
      : defaultValue;
    this.user = user;
    this.selectedLevel = level;
    this.gameMode = gameMode;
  }

  save(): Promise<boolean> {
    const settings: Settings = {
      level: this.selectedLevel,
      gameMode: this.gameMode,
      user: this.user,
    };
    localStorage.setItem('settings', JSON.stringify(settings));

    return this.router.navigateByUrl('snake');
  }
}
