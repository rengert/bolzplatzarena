import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { version } from '../../../../version';
import { LinkButtonComponent } from '../../../shared/components/link-button/link-button.component';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    TranslateModule,
    LinkButtonComponent,
  ],
})
export class VersionComponent {
  readonly version = version;
}
