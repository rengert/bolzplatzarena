import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpeedDialService } from '@bpa/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../../components/base/base.component';
import { Worker } from '../../../../models/worker.model';
import { EmployeeStorageService } from '../../services/storage/employee-storage.service';

@Component({
  selector: 'app-labout-market',
  templateUrl: './labour-market.component.html',
  styleUrls: ['./labour-market.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabourMarketComponent extends BaseComponent {
  readonly displayedColumns: string[] = ['name', 'age', 'domicil', 'distance', 'position', 'salary', 'level', 'percentage'];
  readonly data$: Observable<Worker[]>;

  constructor(
    speedDial: SpeedDialService,
    private readonly employeeStorage: EmployeeStorageService,
  ) {
    super(speedDial);
    this.buttons = [
      { key: 'HeadHunter', icon: 'portrait', route: ['head-hunter'] },
    ];
    this.data$ = this.employeeStorage.getAll$();
  }
}
