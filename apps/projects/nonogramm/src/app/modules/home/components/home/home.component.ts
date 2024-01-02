import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VersionComponent } from '../version/version.component';
import { RouterLink } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NavigationComponent,
        RouterLink,
        VersionComponent,
    ],
})
export class HomeComponent {
}
