import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Level } from '../../../../models/level';
import { StorageService } from '../../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  level: Level;
  levels: Level[] = [Level.easy, Level.medium, Level.heavy];
  size: number;
  sizes: number[] = [5, 10, 15];

  constructor(
    private readonly storage: StorageService,
    private readonly router: Router,
  ) {
  }

  ngOnInit() {
    const config = this.storage.loadConfig();
    this.level = config.level;
    this.size = config.size;
  }

  save() {
    this.storage.saveConfig({
      size: this.size,
      level: this.level
    });
    this.router.navigate(['']);
  }
}
