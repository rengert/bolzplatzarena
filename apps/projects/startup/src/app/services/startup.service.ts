import { Injectable } from '@angular/core';
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
}
