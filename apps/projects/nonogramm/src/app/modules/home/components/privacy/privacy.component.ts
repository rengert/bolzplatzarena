import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CoreModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CoreModule,
    MatButtonModule,
    RouterLink,
    TranslateModule,
  ],
})
export class PrivacyComponent {
}
