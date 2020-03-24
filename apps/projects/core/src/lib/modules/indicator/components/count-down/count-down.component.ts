import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bpa-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountDownComponent implements OnInit {
  readonly visible$ = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    // setTimeout(() => this.visible$.next(false), 3500);
  }
}
