import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { VersionComponent } from '../version/version.component';
import { CoreModule } from '../../../../../../../core/src/lib/core.module';

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
