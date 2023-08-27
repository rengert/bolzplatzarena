import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { PrivacyService } from '../services/privacy.service';

@Injectable({ providedIn: 'root' })
export class PrivacyGuard  {
  constructor(
    private readonly privacy: PrivacyService,
    private readonly router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (!this.privacy.existsConsent()) {
      void this.router.navigate(['consent']);

      return false;
    }

    return true;
  }
}
