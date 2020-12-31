import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  readonly kills$: Observable<number>;
  readonly cash$: Observable<number>;

  constructor(account: AccountService) {
    this.kills$ = account.kills$;
    this.cash$ = account.cash$;
  }
}
