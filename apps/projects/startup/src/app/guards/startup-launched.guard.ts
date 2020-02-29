import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StartupService } from '../services/startup.service';

@Injectable({ providedIn: 'root' })
export class StartupLaunchedGuard implements CanActivate {
  constructor(private readonly startup: StartupService, private readonly router: Router) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.startup.launched()
      .then(result => {
        if (!result) {
          return this.router.navigate(['launch']);
        }

        return result;
      });
  }
}
