import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpeedDialService } from '@bpa/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../../components/base/base.component';
import { Worker } from '../../../../models/worker.model';
import { EmployeeStorageService } from '../../services/storage/employee-storage.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent extends BaseComponent {
  readonly displayedColumns: string[] = ['name', 'age', 'position', 'salary', 'level', 'percentage'];
  readonly data$: Observable<Worker[]>;

  constructor(
    speedDial: SpeedDialService,
    private readonly employeeStorage: EmployeeStorageService,
  ) {
    super(speedDial);
    this.buttons = [
      { key: 'HeadHunter', icon: 'portrait', route: ['head-hunter'] },
    ];
    this.data$ = this.employeeStorage.getEmployed$();
  }
}
