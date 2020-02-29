import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PrivacyService } from '../services/privacy.service';

@Injectable({ providedIn: 'root' })
export class PrivacyGuard implements CanActivate {
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
      this.router.navigate(['consent']);

      return false;
    }

    return true;
  }
}
