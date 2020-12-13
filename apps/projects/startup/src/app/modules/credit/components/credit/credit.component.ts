import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credit } from '../../models/credit.model';
import { CreditService } from '../../services/credit.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditComponent {
  readonly myCredits$: Observable<Credit[]>;
  readonly availableCredits$: Observable<Credit[]>;

  private readonly refresh = new BehaviorSubject(undefined);

  constructor(private readonly credit: CreditService) {
    this.myCredits$ = this.credit.list$();
    this.availableCredits$ = this.refresh.pipe(switchMap(() => this.credit.generate$()));
  }

  action(credit: Credit): void {
    this.credit.borrow(credit);
    this.refresh.next(undefined);
  }

  repay(credit: Credit): void {
    // todo: nur teilweise zurückzahlen
    this.credit.repay(credit, credit.amount);
    this.refresh.next(undefined);
  }
}
