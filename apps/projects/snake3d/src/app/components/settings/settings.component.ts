import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
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
  user = '';
  selectedLevel: Level;
  gameMode: GameMode;

  readonly levels: {
    key: string;
    value: Level;
  }[];
  readonly modes: {
    key: string;
    value: GameMode;
  }[];

  readonly settings: Settings;

  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone,
  ) {
    this.levels = [
      { key: 'EASY', value: Level.easy },
      { key: 'NORMAL', value: Level.normal },
      { key: 'HARD', value: Level.hard },
    ];

    this.modes = [
      { key: 'NORMAL', value: GameMode.normal },
      { key: 'NO_WALLS', value: GameMode.noWalls },
      { key: 'GOLDEN_APPLE', value: GameMode.goldenApple },
    ];

    const data = localStorage.getItem('settings');
    const defaultValue = {
      level: Level.normal,
      gameMode: GameMode.normal,
      user: 'Anonym',
    };

    this.settings = data
      ? { ...defaultValue, ...(JSON.parse(data) as Settings) }
      : defaultValue;
    this.user = this.settings.user;
    this.selectedLevel = this.settings.level;

    Plugins.App.addListener('backButton', () => {
      this.ngZone.run(() => {
        Plugins.App.exitApp();
      });
    });
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
