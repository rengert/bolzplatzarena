import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkButtonComponent } from '../../../shared/components/link-button/link-button.component';

@Component({
    selector: 'app-imprint',
    templateUrl: './imprint.component.html',
    styleUrls: ['./imprint.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [LinkButtonComponent],
})
export class ImprintComponent {
}
