import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '../../app.constants';

export interface Settings {
  level: Level;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  readonly Level = Level;
  level: Level;
  readonly levels: { key: string, value: Level }[];

  constructor(private readonly router: Router) {
    this.levels = [
      { key: 'EASY', value: Level.Easy },
      { key: 'NORMAL', value: Level.Normal },
      { key: 'HARD', value: Level.Hard },
      { key: 'FASTER', value: Level.Faster },
    ];
  }

  save(): void {
    localStorage.setItem('settings', JSON.stringify({ level: this.level }));
    void this.router.navigate(['snake']);
  }
}
