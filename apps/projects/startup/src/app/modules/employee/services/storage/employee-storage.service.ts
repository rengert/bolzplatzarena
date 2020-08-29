import { Injectable } from '@angular/core';
import { AbstractStorageService } from '@bpa/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Worker } from '../../../../models/worker.model';
import { AppStorageService } from '../../../../services/storage/app-storage.service';

@Injectable({ providedIn: 'root' })
export class EmployeeStorageService extends AbstractStorageService<Worker> {
  constructor(storage: AppStorageService) {
    super(storage, 'worker');
  }

  getEmployed$(): Observable<Worker[]> {
    return this.getAll$().pipe(
      map(data => data.filter(worker => worker.employed)),
    );
  }

  async getEmployed(): Promise<Worker[]> {
    return this.getEmployed$().pipe(
      first(),
    ).toPromise();
  }

  protected loadNavigationProperties(item: Worker): void {
    //
  }
}
