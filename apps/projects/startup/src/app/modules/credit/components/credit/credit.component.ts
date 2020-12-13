import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Credit } from '../../models/credit.model';
import { CreditService } from '../../services/credit.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditComponent {
  readonly myCredits$: Observable<Credit[]>;
  readonly availableCredits$: Observable<Credit[]>;

  constructor(private readonly credit: CreditService) {
    this.myCredits$ = this.credit.list$();
    this.availableCredits$ = this.credit.generate$();
  }

  action(credit: Credit): void {
    this.credit.borrow(credit);
  }

  repay(credit: Credit): void {
    // todo: nur teilweise zurückzahlen
    this.credit.repay(credit, credit.amount);
  }
}
