import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Worker } from '../../../../models/worker.model';
import { CreditService } from '../../../../services/credit.service';
import { EmployeeStorageService } from '../../services/storage/employee-storage.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerComponent implements OnInit {
  worker$: Promise<Worker | undefined>;
  private readonly id: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly credit: CreditService,
    private readonly employeeStorage: EmployeeStorageService,
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.worker$ = this.employeeStorage.byId(this.id);
  }

  async employ(worker: Worker): Promise<void> {
    worker.employed = true;
    await this.employeeStorage.put([worker], false);
    await this.credit.change(-10000, 'Neuer Mitarbeiter (Arbeitsplatz / Ausrüstung / Verwaltung etc.)');
  }
}
