import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Audit, CreditStorageService } from '../../../../services/storage/credit-storage.service';

@Component({
  selector: 'app-credit-audit',
  templateUrl: './credit-audit.component.html',
  styleUrls: ['./credit-audit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditAuditComponent {
  readonly displayedColumns: string[] = ['date', 'value', 'reason'];
  readonly data$: Observable<Audit[]>;

  constructor(private readonly creditStorage: CreditStorageService) {
    this.data$ = this.creditStorage.watchAudit$();
  }
}
