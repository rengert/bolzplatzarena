import { ChangeDetectionStrategy, Component } from '@angular/core';
import { version } from '../../../../version';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly version = version;
}
