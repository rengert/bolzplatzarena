import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { CoreModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { Level } from '../../../../models/level';
import { Size } from '../../../../models/size';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CoreModule,
    MatCardModule,
    TranslateModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    UpperCasePipe
],
})
export class SettingsComponent implements OnInit {
  level: Level;
  size: Size;

  readonly levels: Level[] = [Level.easy, Level.medium, Level.heavy];
  readonly sizes: Size[] = [Size.small, Size.medium, Size.large];

  constructor(
    private readonly storage: StorageService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    const config = this.storage.loadConfig();
    this.level = config.level;
    this.size = config.size;
  }

  save(): void {
    this.storage.saveConfig({
      size: this.size,
      level: this.level,
    });
    void this.router.navigate(['']);
  }
}
