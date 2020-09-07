import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpeedDialService } from '@bpa/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    employeeStorage: EmployeeStorageService,
    speedDial: SpeedDialService,
  ) {
    super(speedDial);
    this.buttons = [
      { key: 'HeadHunter', icon: 'portrait', route: ['head-hunter'] },
    ];
    this.data$ = employeeStorage.getAll$().pipe(
      map(data => data.filter(worker => !worker.employed)),
    );
  }
}
