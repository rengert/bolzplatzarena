import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Worker } from '../../../../../models/worker.model';
import { EmployeeStorageService } from '../../../../employee/services/storage/employee-storage.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  readonly displayedColumns: string[] = ['name', 'salary'];
  readonly data$: Observable<Worker[]>;

  constructor(private readonly employeeStorage: EmployeeStorageService) {
    this.data$ = this.employeeStorage.getAll$().pipe(
      map(data => data.filter(worker => worker.employed)),
    );
  }
}
