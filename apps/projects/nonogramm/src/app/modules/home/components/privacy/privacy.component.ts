import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '../../../../../../../core/src/lib/core.module';

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
