import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Config } from '../../../../../models/config';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent implements OnChanges {
  @Input() config: Config;

  levelTranslationKey: string;

  ngOnChanges(changes: SimpleChanges) {
    this.levelTranslationKey = 'GLOBAL.ENUM.LEVEL.' + this.config.level.toString().toUpperCase();
  }
}
