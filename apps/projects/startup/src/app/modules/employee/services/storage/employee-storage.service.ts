import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Worker } from '../../../../models/worker.model';
import { AppStorageService } from '../../../../services/storage/app-storage.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStorageService {
  constructor(private readonly appStorage: AppStorageService) {
  }

  get$(): Observable<Worker[]> {
    return from(this.appStorage.workers.toArray());
  }
}
