import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Worker } from '../../../../models/worker.model';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeTableComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('data') data$: Observable<Worker[]>;
  @Input() columns = ['name', 'salary'];
}
