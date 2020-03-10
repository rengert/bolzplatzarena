import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SpeedDialService } from '../../../../../../../core/src/lib/modules/button/services/speed-dial.service';
import { BaseComponent } from '../../../../components/base/base.component';
import { Worker } from '../../../../models/worker.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-labout-market',
  templateUrl: './labour-market.component.html',
  styleUrls: ['./labour-market.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabourMarketComponent extends BaseComponent implements OnInit {
  readonly displayedColumns: string[] = ['name', 'position', 'salary'];
  data$: Promise<Worker[]>;

  constructor(speedDial: SpeedDialService, private readonly employee: EmployeeService) {
    super(speedDial);
    this.buttons = [
      { key: 'HeadHunter', icon: 'portrait', route: ['head-hunter'] },
    ];
  }

  ngOnInit(): void {
    this.data$ = this.employee.seed();
  }
}
