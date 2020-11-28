import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'bpa-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCardComponent {
  @Input() header: string;
  @Input() icon: string;
  @Input() route: string[];
}
