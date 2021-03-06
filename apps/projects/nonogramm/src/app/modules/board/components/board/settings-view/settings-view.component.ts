import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Config } from '../../../../../models/config';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent {
  @Input() config: Config;
}
