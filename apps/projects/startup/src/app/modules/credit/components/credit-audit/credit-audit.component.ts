import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Audit, CreditStorageService } from '../../../../services/storage/credit-storage.service';

@Component({
  selector: 'app-credit-audit',
  templateUrl: './credit-audit.component.html',
  styleUrls: ['./credit-audit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditAuditComponent implements OnInit {
  @Input() count = 100;

  @HostBinding('class') class = 'full-size';

  readonly displayedColumns: string[] = ['date', 'value', 'reason'];

  data$: Observable<Audit[]>;

  constructor(private readonly creditStorage: CreditStorageService) {
  }

  ngOnInit(): void {
    this.data$ = this.creditStorage.watchAudit$(this.count);
  }
}
