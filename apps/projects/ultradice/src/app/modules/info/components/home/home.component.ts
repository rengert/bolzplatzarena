import { ChangeDetectionStrategy, Component } from '@angular/core';
import { version } from '../../../../version';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink],
})
export class HomeComponent {
  readonly version = version;
}
