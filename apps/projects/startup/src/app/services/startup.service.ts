import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
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

  async launched(): Promise<boolean> {
    return this.startupStorage.launched();
  }

  get$(): Observable<Startup | undefined> {
    return this.startupStorage.get$();
  }

  async launch(config: LaunchStartup): Promise<Startup> {
    const startup: Startup = {
      name: config.startup,
      description: config.companyDescription,
      founder: {
        firstname: config.firstName,
        lastname: config.lastName,
      },
      offices: [],
    };

    return this.startupStorage.save(startup);
  }

  update(startup: Startup): Observable<Startup> {
    return from(this.startupStorage.save(startup));
  }
}
