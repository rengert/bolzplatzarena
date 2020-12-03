import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from '../../../../constants';
import { Worker } from '../../../../models/worker.model';
import { CreditService } from '../../../../services/credit.service';
import { EmployeeStorageService } from '../../services/storage/employee-storage.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerComponent {
  readonly worker$: Promise<Worker | undefined>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly credit: CreditService,
    private readonly employeeStorage: EmployeeStorageService,
  ) {
    const id = this.activatedRoute.snapshot.params.id;
    this.worker$ = this.employeeStorage.byId(id);
  }

  async employ(worker: Worker): Promise<void> {
    worker.employed = true;
    await this.employeeStorage.put([worker], false);
    await this.credit.substract(CONSTANTS.worker.initial, 'Neuer Mitarbeiter (Arbeitsplatz / Ausrüstung / Verwaltung etc.)');
  }

  async fire(worker: Worker): Promise<void> {
    worker.employed = false;
    await this.employeeStorage.put([worker], false);
  }
}
