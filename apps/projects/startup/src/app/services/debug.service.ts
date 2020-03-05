import { Injectable } from '@angular/core';
import { StartupStorageService } from './storage/startup-storage.service';

@Injectable({ providedIn: 'root' })
export class DebugService {
  constructor(private readonly startupStorage: StartupStorageService) {
  }

  deleteOffices(): void {
    //
  }

  async deleteStartup(): Promise<void> {
    return this.startupStorage.delete();
  }
}
