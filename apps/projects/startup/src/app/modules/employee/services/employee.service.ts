import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Worker } from '../../../models/worker.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  async seed(): Promise<Worker[]> {
    return new Promise<Worker[]>(
      resolve => {
        const data: Worker[] = [];
        data.push({ id: uuid(), firstname: 'Greg', lastname: 'Bob', salary: 1, position: { id: uuid(), name: 'Entwickler' } });
        data.push({ id: uuid(), firstname: 'Marge', lastname: 'Bob', salary: 10, position: { id: uuid(), name: 'Entwickler' } });
        data.push({ id: uuid(), firstname: 'Silv', lastname: 'Bob', salary: 100, position: { id: uuid(), name: 'Entwickler' } });
        data.push({ id: uuid(), firstname: 'Arge', lastname: 'Bob', salary: 1000, position: { id: uuid(), name: 'Entwickler' } });
        data.push({ id: uuid(), firstname: 'Mats', lastname: 'Bob', salary: 10000, position: { id: uuid(), name: 'Entwickler' } });
        resolve(data);
      },
    );
  }
}
