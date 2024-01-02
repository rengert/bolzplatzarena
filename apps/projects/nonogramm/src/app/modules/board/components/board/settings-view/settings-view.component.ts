import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Config } from '../../../../../models/config';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-settings-view',
    templateUrl: './settings-view.component.html',
    styleUrls: ['./settings-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [UpperCasePipe, TranslateModule],
})
export class SettingsViewComponent {
  @Input() config: Config;
}
