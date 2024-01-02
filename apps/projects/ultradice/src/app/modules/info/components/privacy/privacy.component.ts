import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkButtonComponent } from '../../../shared/components/link-button/link-button.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatCardModule, LinkButtonComponent],
})
export class PrivacyComponent {

}
