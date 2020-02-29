import { Injectable } from '@angular/core';
import { StartupStorageService } from './storage/startup-storage.service';

@Injectable({ providedIn: 'root' })
export class StartupService {
  constructor(private readonly startupStorage: StartupStorageService) {
  }

  async launched(): Promise<boolean> {
    return this.startupStorage.launched();
  }
}
