import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameMode, Level } from '../../app.constants';

export interface Settings {
  level: Level;
  gameMode: GameMode;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  readonly Level = Level;
  readonly GameMode = GameMode;
  level: Level;
  gameMode: GameMode;
  readonly levels: { key: string, value: Level }[];
  readonly modes: { key: string, value: GameMode }[];

  constructor(private readonly router: Router) {
    this.levels = [
      { key: 'EASY', value: Level.Easy },
      { key: 'NORMAL', value: Level.Normal },
      { key: 'HARD', value: Level.Hard },
      { key: 'FASTER', value: Level.Faster },
    ];

    this.modes = [
      { key: 'NORMAL', value: GameMode.Normal },
      { key: 'NO_WALLS', value: GameMode.NoWalls },
      { key: 'GOLDEN_APPLE', value: GameMode.GoldenApple },
    ];
  }

  save(): void {
    localStorage.setItem('settings', JSON.stringify({ level: this.level, gameMode: this.gameMode }));
    void this.router.navigate(['snake']);
  }
}
