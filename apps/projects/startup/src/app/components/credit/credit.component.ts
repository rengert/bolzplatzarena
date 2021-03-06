import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StartupService } from '../../services/startup.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditComponent {
  readonly credit$: Observable<number>;

  constructor(startUp: StartupService) {
    this.credit$ = startUp.watch$().pipe(
      filter(data => !!data),
      map(data => data.credit),
    );
  }
}
