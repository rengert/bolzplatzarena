import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bpa-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountDownComponent {
  readonly visible$ = new BehaviorSubject<boolean>(true);
}
