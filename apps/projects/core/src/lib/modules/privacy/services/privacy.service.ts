import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PrivacyService {
  existsConsent(): boolean {
    return localStorage.getItem('privacy.consent') !== null;
  }

  setConstent(): void {
    localStorage.setItem('privacy.consent', 'done');
  }
}
