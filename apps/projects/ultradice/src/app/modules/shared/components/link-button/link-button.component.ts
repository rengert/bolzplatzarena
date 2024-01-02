import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-link-button',
    templateUrl: './link-button.component.html',
    styleUrls: ['./link-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButtonModule, RouterLink],
})
export class LinkButtonComponent {
  @Input() routerLink = ['/home'];
}
