import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Level, Worker } from '../../../models/worker.model';
import { AppStorageService } from '../../../services/storage/app-storage.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private readonly appStorage: AppStorageService) {
  }

  async seed(): Promise<string> {
    const data: Worker[] = [
      {
        id: uuid(),
        firstname: 'Greg',
        lastname: 'Smith',
        salary: 1,
        position: { id: uuid(), name: 'Entwickler' },
        level: Level.junior,
        domicile: 'Chemnitz',
        birthday: '1999-01-01',
        distance: 1000,
        percentage: 100,
      },
      {
        id: uuid(),
        firstname: 'Betty',
        lastname: 'Muller',
        salary: 10,
        position: { id: uuid(), name: 'Entwickler' },
        level: Level.senior,
        domicile: 'Dresden',
        birthday: '1989-01-01',
        distance: 100,
        percentage: 100,
      },
      {
        id: uuid(),
        firstname: 'Greg',
        lastname: 'Smith',
        salary: 123,
        position: { id: uuid(), name: 'Entwickler' },
        level: Level.junior,
        domicile: 'Berlin',
        birthday: '1991-01-01',
        distance: 100,
        percentage: 80,
      },
    ];

    return this.appStorage.workers.bulkAdd(data);
  }
}
