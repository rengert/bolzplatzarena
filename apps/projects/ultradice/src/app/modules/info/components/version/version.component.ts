import { ChangeDetectionStrategy, Component } from '@angular/core';
import { version } from '../../../../version';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent {
  readonly version = version;
}
