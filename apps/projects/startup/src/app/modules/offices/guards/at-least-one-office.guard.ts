import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StartupService } from '../../../services/startup.service';

@Injectable({ providedIn: 'root' })
export class AtLeastOneOfficeGuard implements CanActivate {
  constructor(private readonly startup: StartupService, private readonly router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.startup.get$()
      .pipe(
        map(startup => {
          const hasOffices = !!startup.offices.length;
          if (!hasOffices) {
            void this.router.navigate(['open-office']);
          }

          return hasOffices;
        }),
      );
  }
}
