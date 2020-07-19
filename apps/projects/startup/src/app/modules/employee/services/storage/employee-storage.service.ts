import { Injectable } from '@angular/core';
import { AbstractStorageService } from '@bpa/core';
import { Worker } from '../../../../models/worker.model';
import { AppStorageService } from '../../../../services/storage/app-storage.service';

@Injectable({ providedIn: 'root' })
export class EmployeeStorageService extends AbstractStorageService<Worker> {
  constructor(storage: AppStorageService) {
    super(storage, 'worker');
  }

  protected loadNavigationProperties(item: Worker): void {
    //
  }
}
