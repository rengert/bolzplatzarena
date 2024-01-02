import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CoreModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { VersionComponent } from '../version/version.component';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CoreModule,
    VersionComponent,
    MatButtonModule,
    RouterLink,
    TranslateModule,
  ],
})
export class ImprintComponent {
}
