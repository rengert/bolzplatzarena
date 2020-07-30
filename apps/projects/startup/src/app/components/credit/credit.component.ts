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

  constructor(private readonly startUp: StartupService) {
    this.credit$ = this.startUp.get$().pipe(
      filter(data => !!data),
      map(data => data.credit),
    );
  }
}
