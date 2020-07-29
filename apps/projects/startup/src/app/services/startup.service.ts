import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Startup } from '../models/startup.model';
import { StartupStorageService } from './storage/startup-storage.service';

export interface LaunchStartup {
  sex: string;
  firstName: string;
  lastName: string;
  startup: string;
  companyType: string;
  companyTopic: string;
  companyDescription: string;
}

@Injectable({ providedIn: 'root' })
export class StartupService {
  constructor(private readonly startupStorage: StartupStorageService) {
  }

  launched$(): Observable<boolean> {
    return this.startupStorage.launched$();
  }

  get$(): Observable<Startup> {
    return this.startupStorage.get$();
  }

  launch$(config: LaunchStartup): Observable<Startup> {
    const startup: Startup = {
      name: config.startup,
      description: config.companyDescription,
      founder: {
        id: uuid(),
        firstname: config.firstName,
        lastname: config.lastName,
        birthday: '',
      },
      offices: [],
      credit: 100000,
    };

    return this.startupStorage.save$(startup);
  }

  update(startup: Startup): Observable<Startup> {
    return this.startupStorage.save$(startup);
  }
}
