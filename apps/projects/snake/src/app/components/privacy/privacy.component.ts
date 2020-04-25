import { ChangeDetectionStrategy, Component } from '@angular/core';
import { version } from '../../version';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent {
  readonly version = version;
}
