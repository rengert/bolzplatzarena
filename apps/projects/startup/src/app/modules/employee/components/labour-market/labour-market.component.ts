import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpeedDialService } from '../../../../../../../core/src/lib/modules/button/services/speed-dial.service';
import { BaseComponent } from '../../../../components/base/base.component';
import { Worker } from '../../../../models/worker.model';
import { EmployeeStorageService } from '../../services/storage/employee-storage.service';

@Component({
  selector: 'app-labout-market',
  templateUrl: './labour-market.component.html',
  styleUrls: ['./labour-market.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabourMarketComponent extends BaseComponent implements OnInit {
  readonly displayedColumns: string[] = ['name', 'domicil', 'distance', 'position', 'salary', 'level', 'percentage'];
  data$: Observable<Worker[]>;

  constructor(
    speedDial: SpeedDialService,
    private readonly employeeStorage: EmployeeStorageService,
  ) {
    super(speedDial);
    this.buttons = [
      { key: 'HeadHunter', icon: 'portrait', route: ['head-hunter'] },
    ];
  }

  ngOnInit(): void {
    this.data$ = this.employeeStorage.get$();
  }
}