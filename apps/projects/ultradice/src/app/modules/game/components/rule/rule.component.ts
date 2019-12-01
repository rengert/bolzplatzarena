import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleComponent {
  @Input() text: string;
  @Input() value?: number;
}
